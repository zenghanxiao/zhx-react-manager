import { Layout, Watermark } from 'antd'
import type React from 'react'
const { Content, Sider } = Layout
import styles from './index.module.less'
import { Navigate, Outlet, useLoaderData, useLocation } from 'react-router'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import api from '@/api'
import { useEffect } from 'react'
import { useStore } from '@/store'
import TabsFC from '@/components/Tabs'
import { searchRoute } from '@/utils'
import type { IAuthLoader } from '@/router/Authloader'
import { router } from '@/router'

const App: React.FC = () => {
  const { collapsed, userInfo, updateUserInfo } = useStore()
  const { pathname } = useLocation()
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  const data = useLoaderData() as IAuthLoader
  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

  return (
    <Watermark content='React'>
      {userInfo._id ? (
        <Layout>
          <Sider collapsed={collapsed}>
            <Menu />
          </Sider>
          <Layout>
            <NavHeader />
            <TabsFC />
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <Outlet></Outlet>
              </div>
              <NavFooter />
            </div>
          </Layout>
        </Layout>
      ) : null}
    </Watermark>
  )
}

export default App
