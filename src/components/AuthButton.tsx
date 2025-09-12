import type { IAuthLoader } from '@/router/Authloader'
import { useStore } from '@/store'
import { Button } from 'antd'
import { useLoaderData } from 'react-router'

export default function AuthButton(props: any) {
  const data = useLoaderData() as IAuthLoader
  const role = useStore(state => state.userInfo.role)
  if (!props.auth || data.buttonList.includes(props.auth) || role == 1) {
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}
