import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Result
      status={404}
      title='404'
      subTitle='抱歉，您访问的页面不存在'
      extra={
        <Button type='primary' onClick={handleClick}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
