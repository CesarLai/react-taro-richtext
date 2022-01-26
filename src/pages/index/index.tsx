import { useCallback, useMemo } from 'react'
import Taro, { FC } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { MD_TEXT } from './markdownText'
import TaroRichText, {
  RichTextEventCenter
} from '../../components/TaroRichText'

import './index.scss'

const Index: FC = () => {
  const imageEventHandler = useCallback((src: string) => {
    Taro.previewImage({
      current: src,
      urls: [src]
    })
  }, [])

  const linkEventHandler = useCallback((href: string) => {
    Taro.navigateTo({
      url: `/pages/web/index?url=${href}`
    })
  }, [])

  const richTextEvents = useMemo<RichTextEventCenter>(
    () => ({
      image: imageEventHandler,
      link: linkEventHandler
    }),
    [imageEventHandler, linkEventHandler]
  )

  return (
    <ScrollView className="index">
      <TaroRichText
        content={MD_TEXT}
        type="markdown"
        eventCenter={richTextEvents}
      />
    </ScrollView>
  )
}

export default Index
