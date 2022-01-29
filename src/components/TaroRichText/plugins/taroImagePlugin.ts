import { TaroElement } from '@tarojs/runtime'
import { Element } from '@tarojs/runtime/dist/dom-external/inner-html/parser'
import { createSelectorQuery } from '@tarojs/taro'

/**
 * Taro Image 处理插件
 * @param taroElement
 * @param element
 */
const taroImagePlugin = (taroElement: TaroElement, element: Element) => {
  taroElement.setAttribute('mode', 'aspectFit')
  taroElement.addEventListener(
    'load',
    (e) => {
      createSelectorQuery()
        .select(`#${taroElement.uid}`)
        .boundingClientRect((result) => {
          const height = (e.detail.height * result.width) / e.detail.width
          taroElement.setAttribute('style', `height: ${height}px;`)
        })
        .exec()
    },
    { once: true }
  )
  return taroElement
}

export default taroImagePlugin
