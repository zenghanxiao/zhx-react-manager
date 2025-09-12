import { RouterProvider } from 'react-router'
import './App.less'
import './styles/theme.less'
import router from './router'
import { App as Antapp, ConfigProvider, Spin } from 'antd'
import AntdGlobal from './utils/AntdGlobal'
import { Suspense } from 'react'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#006ad4'
        }
      }}
    >
      <Antapp>
        <AntdGlobal />
        <Suspense
          fallback={
            <Spin
              size='large'
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
            />
          }
        >
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </Antapp>
    </ConfigProvider>
  )
}

export default App
