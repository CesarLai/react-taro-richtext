import { options as taroRuntimeOptions } from '@tarojs/runtime'
import taroTextPlugin from './plugins/taroTextPlugin'
import taroImagePlugin from './plugins/taroImagePlugin'

export const withRuntimeTransform = () => {
  if (taroRuntimeOptions.html) {
    // 修改 Taro 文本渲染逻辑
    taroRuntimeOptions.html.transformText = (taroText, text) => {
      return taroTextPlugin(taroText, text)
    }
  }

  if (taroRuntimeOptions.html) {
    // 修改 Taro 元素渲染逻辑
    taroRuntimeOptions.html.transformElement = (taroEl, el) => {
      if (
        taroEl.nodeName === 'image' &&
        taroEl.props.class.includes('h5-img')
      ) {
        // img节点
        return taroImagePlugin(taroEl, el)
      }

      return taroEl
    }
  }
}
