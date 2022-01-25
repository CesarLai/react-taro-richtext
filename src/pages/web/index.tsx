import { FC, useRouter } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

import './index.scss'

const WebViewPage: FC = () => {
  const { params } = useRouter<Record<'url', string>>()

  return (
    <View className='webview-page'>
      <WebView src={params.url} />
    </View>
  )
}

export default WebViewPage
