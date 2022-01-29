import { useCallback, useMemo } from 'react'
import { TaroElement, document } from '@tarojs/runtime'
import { FC } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'

import { withRuntimeTransform } from './transform'
import { markedFactory } from './markdown'

import './index.scss'

export type ImageEventHandler = (src: string) => void

export type LinkEventHandler = (url: string) => void

export interface RichTextEventCenter {
  image?: ImageEventHandler
  link?: LinkEventHandler
}

export interface TaroRichTextProps {
  className?: string
  /** 富文本类型 */
  type?: 'html' | 'markdown'
  /** 富文本 */
  content?: string
  /** 代码风格 */
  codeTheme?: 'light' | 'dark'
  /** 事件中心，用于配置不同类型事件的事件监听函数 */
  eventCenter?: RichTextEventCenter
}

const CONTAINER_ID = 'taro-richtext'

withRuntimeTransform()

/**
 * Taro 富文本渲染组件
 */
const TaroRichText: FC<TaroRichTextProps> = (props) => {
  const markedInstance = useMemo(() => markedFactory(), [])

  const codeStyles = useMemo(() => {
    return require(`./markdown/code/styles/vs-${props.codeTheme}.module.scss`)
  }, [props.codeTheme])

  const richText = useMemo(() => {
    if (props.type === 'markdown') {
      return markedInstance(props.content ?? '')
    }

    return props.content ?? ''
  }, [props.content, props.type, markedInstance])

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
      className={classNames(
        CONTAINER_ID,
        codeStyles[`vs-${props.codeTheme}`],
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: richText }}
      onClick={onRootClick}
    />
  )
}

TaroRichText.defaultProps = {
  content: '',
  type: 'html',
  codeTheme: 'light'
}

export default TaroRichText
