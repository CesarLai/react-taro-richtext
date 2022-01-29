import { marked } from 'marked'
import hljs from 'highlight.js'

export const markedFactory = () => {
  const markedInstance = marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code, lang) => hljs.highlight(lang, code).value,
    gfm: true,
    breaks: true
  })

  markedInstance.use({
    renderer: {
      image: (href, title, text) => {
        return `
        <div class="image-wrap">
          <img src="${href}" alt="${text}">
          <span class="title">${text}</span>
        </div>
      `
      }
    }
  })

  return markedInstance
}
