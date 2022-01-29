import { TaroText } from '@tarojs/runtime'
import { Text } from '@tarojs/runtime/dist/dom-external/inner-html/parser'
import he from 'he'

/**
 * TaroText 处理插件
 * @param taroText
 * @param text
 */
const taroTextPlugin = (taroText: TaroText, text: Text) => {
  // 将 HTML 实体转义为原字符
  taroText.textContent = he.unescape(taroText.textContent)
  return taroText
}

export default taroTextPlugin
