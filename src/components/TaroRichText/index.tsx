import { useCallback, useMemo } from 'react'
import { TaroElement, document } from '@tarojs/runtime'
import { FC } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { marked } from 'marked'
import hljs from 'highlight.js'

import './index.scss'
import './markdown/code/vs2015.scss'

export type ImageEventHandler = (src: string) => void

export type LinkEventHandler = (url: string) => void

export interface RichTextEventCenter {
  image?: ImageEventHandler
  link?: LinkEventHandler
}

export interface TaroRichTextProps {
  /** 富文本类型 */
  type?: 'html' | 'markdown'
  /** 富文本 */
  content?: string
  /** 事件中心，用于配置不同类型事件的事件监听函数 */
  eventCenter?: RichTextEventCenter
}

const CONTAINER_ID = 'taro-richtext'

// marked.use({
//   renderer: {
//     image: (href: string | null = '', title: string | null = '', text: string = '') => {
//       return `<img src="${href}" alt="${text}" data-src="${href}" />`
//     },
//     link: (href: string | null = '', title: string | null = '', text: string = '') => {
//       return `<a href="${href}" data-href="${href}">${text}</a>`
//     }
//   }
// })

const markedInstance = marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
})

/**
 * Taro 富文本渲染组件
 */
const TaroRichText: FC<TaroRichTextProps> = (props) => {
  const richText = useMemo(() => {
    if (props.type === 'markdown') {
      return markedInstance(props.content ?? '')
    }

    return props.content ?? ''
  }, [props.content, props.type])

  /**
   * 图片点击事件分发函数
   * @param targetProps 元素Props
   * @param dataset 元素自定义属性集合
   */
  const dispatchImageEvent = useCallback(
    (targetProps: Record<string, string>, dataset: Record<string, unknown>) => {
      props.eventCenter?.image?.(targetProps.src ?? '')
    },
    [props.eventCenter]
  )

  /**
   * 链接点击事件分发函数
   * @param targetProps 元素Props
   * @param dataset 元素自定义属性集合
   */
  const dispatchLinkEvent = useCallback(
    (targetProps: Record<string, string>, dataset: Record<string, unknown>) => {
      props.eventCenter?.link?.(targetProps.href ?? '')
    },
    [props.eventCenter]
  )

  /**
   * RichText 事件分发函数
   * @param target 触发事件的Taro元素
   */
  const dispatchEvent = useCallback(
    (target: TaroElement) => {
      const classAttr: string = target.props.class ?? ''
      const matchResult = /h5-(\w+)/gi.exec(classAttr)
      console.log('isH5Tag', matchResult, classAttr)

      if (matchResult && matchResult[1]) {
        switch (matchResult[1]) {
          case 'img':
            dispatchImageEvent(target.props, target.dataset)
            break
          case 'a':
            dispatchLinkEvent(target.props, target.dataset)
            break
        }
      }
    },
    [dispatchImageEvent, dispatchLinkEvent]
  )

  /**
   * 根元素点击事件，用于统一处理子元素事件
   */
  const onRootClick = useCallback(
    (e: ITouchEvent) => {
      const targetEl = document.getElementById(e.target.id)
      if (targetEl) {
        dispatchEvent(targetEl)
      }
    },
    [dispatchEvent]
  )

  return (
    <View
      id={CONTAINER_ID}
      className={classNames(CONTAINER_ID)}
      dangerouslySetInnerHTML={{ __html: richText }}
      onClick={onRootClick}
    />
  )
}

TaroRichText.defaultProps = {
  content: '',
  type: 'html'
}

export default TaroRichText
