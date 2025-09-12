import type { IAuthLoader } from '@/router/Authloader'
import { findTreeNode } from '@/utils'
import { Breadcrumb } from 'antd'
import { type ReactNode, useEffect, useState } from 'react'
import { useLocation, useLoaderData } from 'react-router'

export default function BreadCrumb() {
  const { pathname } = useLocation()
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>([])
  // 权限判断
  const data = useLoaderData() as IAuthLoader

  useEffect(() => {
    const list = findTreeNode(data.menuList, pathname, [])
    setBreadList([<a href='/welcome'>首页</a>, ...list])
  }, [pathname])
  return <Breadcrumb items={breadList.map(item => ({ title: item }))} style={{ marginLeft: 10 }} />
}
