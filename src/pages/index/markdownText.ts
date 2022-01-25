export const MD_TEXT = `
# 标题1
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6
普通文本

![banner](https://cloudcache.tencent-cloud.com/open_proj/proj_qcloud_v2/tea-portal-material-portal/images/recom-bg5e7.jpg)

[百度一下](https://www.baidu.com)

<table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th><th>版本</th></tr></thead><tbody><tr><td>code</td><td>添加代码样式</td><td>boolean</td><td>false</td><td></td></tr><tr><td>copyable</td><td>是否可拷贝，为对象时可进行各种自定义</td><td>boolean | <a href="#copyable">copyable</a></td><td>false</td><td><a href="#copyable">copyable</a></td></tr><tr><td>delete</td><td>添加删除线样式</td><td>boolean</td><td>false</td><td></td></tr><tr><td>disabled</td><td>禁用文本</td><td>boolean</td><td>false</td><td></td></tr><tr><td>editable</td><td>是否可编辑，为对象时可对编辑进行控制</td><td>boolean | <a href="#editable">editable</a></td><td>false</td><td><a href="#editable">editable</a></td></tr><tr><td>ellipsis</td><td>自动溢出省略，为对象时不能设置省略行数、是否可展开、onExpand 展开事件</td><td>boolean | <a href="#ellipsis">Omit&lt;ellipsis, 'expandable' | 'rows' | 'onExpand'&gt;</a></td><td>false</td><td><a href="#ellipsis">ellipsis</a></td></tr><tr><td>keyboard</td><td>添加键盘样式</td><td>boolean</td><td>false</td><td>4.3.0</td></tr><tr><td>mark</td><td>添加标记样式</td><td>boolean</td><td>false</td><td></td></tr><tr><td>onClick</td><td>点击 Text 时的回调</td><td>(event) =&gt; void</td><td>-</td><td></td></tr><tr><td>strong</td><td>是否加粗</td><td>boolean</td><td>false</td><td></td></tr><tr><td>italic</td><td>是否斜体</td><td>boolean</td><td>false</td><td>4.16.0</td></tr><tr><td>type</td><td>文本类型</td><td><code>secondary</code> | <code>success</code> | <code>warning</code> | <code>danger</code></td><td>-</td><td>success: 4.6.0</td></tr><tr><td>underline</td><td>添加下划线样式</td><td>boolean</td><td>false</td><td></td></tr></tbody></table>

\`\`\`typescript
import lodash from \'lodash\'

export default () => {
  return (
    <div>
    </div>
  )
}
\`\`\`
`
