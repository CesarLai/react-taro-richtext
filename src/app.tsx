import { FC, PropsWithChildren } from '@tarojs/taro'
import './app.scss'

type AppProps = PropsWithChildren<{}>

const App: FC<AppProps> = (props) => {
  return <>{props.children}</>
}

export default App
