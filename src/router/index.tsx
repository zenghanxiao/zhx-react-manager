import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'
import Welcome from '@/views/welcome'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Login from '@/views/login'
import Layout from '@/layout'
import AuthLoader from './Authloader'

export const router: RouteObject[] = [
  {
    path: '/',
    Component: () => <Navigate to='/welcome' />
  },
  {
    path: '/login',
    Component: Login
  },
  {
    id: 'layout',
    Component: Layout,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        Component: Welcome
      },
      {
        path: '/dashboard',
        lazy: {
          Component: async () => (await import('@/views/dashboard')).default
        }
      },
      {
        path: '/userList',
        lazy: {
          Component: async () => (await import('@/views/system/user')).default
        }
      },
      {
        path: '/deptList',
        lazy: {
          Component: async () => (await import('@/views/system/dept')).default
        }
      },
      {
        path: '/menuList',
        lazy: {
          Component: async () => (await import('@/views/system/menu')).default
        }
      },
      {
        path: '/roleList',
        lazy: {
          Component: async () => (await import('@/views/system/role')).default
        }
      }
    ]
  },
  {
    path: '*',
    Component: () => <Navigate to='/404' />
  },
  {
    path: '/404',
    Component: Error404
  },
  {
    path: '/403',
    Component: Error403
  }
]

export default createBrowserRouter(router)
