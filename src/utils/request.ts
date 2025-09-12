import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import type { Result } from '@/types/api'
import storage from './storage'
import { message } from './AntdGlobal'
import env from '@/config'
import { hideLoading, showLoading } from './loading'

const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})

interface IConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & IConfig) => {
    if (config.showLoading) showLoading()

    const token = storage.get('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }

    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response

    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code !== 0) {
      if ((response.config as InternalAxiosRequestConfig & IConfig).showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data.data
  },
  (error: AxiosError) => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, data?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, data, options)
  },
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  }
}
