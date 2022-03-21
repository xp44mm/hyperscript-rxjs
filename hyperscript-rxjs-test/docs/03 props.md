# `hyperscript-rxjs`之props

在第一章，我们知道，`hyperscript`有`props`属性参数用于配置DOM的属性。`props`是一个单层普通对象。根据属性名的形式，属性分为简单属性，级联属性，类选择器属性。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

级联属性最常用于`node.style`属性的设置，当我们设置样式时，应该设置其子属性，而非样式属性本身。

本章我们用示例来说明属性的用法。

## 类名属性和类选择器属性

首先，我们建立一个样式表文件`classprop.css`，里面有两个类选择器样式：

```css
.success {
    background: #A5D6A7
}

.failed {
    background: #EF9A9A
}
```

有几种方法使用样式表类，第一种是使用`className`，以下代码显示绿色段落。

```js
import { p } from 'hyperscript-rxjs'
import '../css/classprop.css'

export function classprop() {
    return p({
        className: 'success'
    }, 'test class prop')
}
```

第二种方法，使用类选择器的格式作为属性名，以下代码显示红色段落。

```js
import { p } from 'hyperscript-rxjs'
import '../css/classprop.css'

export function classprop() {
    return p({
        className: 'success',
        '.failed': true, //added
    }, 'test class prop')
}
```

此时的html为：

```html
<p class = "success failed">
    test class prop
</p>
```

注释掉`className`属性，不会改变结果，格式冲突，后来者赢。此时的html为：

```html
<p class = "failed">
    test class prop
</p>
```

类选择器的属性值为`true`表示添加类名，类选择器为`false`表示移除类名。以下代码显示绿色段落。

```js
export function classprop() {
    return p({
        className: 'success',
        '.failed': false, //changed
    }, 'test class prop')
}
```

此时的html为：

```html
<p class = "success">
    test class prop
</p>
```


## 嵌套属性和样式属性

`props`是一个单层普通对象。不进行嵌套，比如，下面两句是等价语句：

```js
div({'style.display':'none'},...);
div.style.display = 'none'
//div({style:{display:'none'},...) <- mistake
```

The following is a basic list of the most common CSS properties with the equivalent of the DOM notation which is usually accessed from JavaScript:

[CSS Properties Reference - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)

例如这是一个背景颜色为绿色的段落：

```js
p({'style.backgroundColor': '#A5D6A7'}, 'test style prop')
```

内联样式常用于设置表格的列宽：

```js
export function styleprop() {
    return table(
        thead(tr(
            th({ 'style.width': '10em' }, '名称'),
            th({ 'style.width': '20em' }, '备注'))),
        tbody(
            tr(th('五一'), td('三天假期')),
            tr(th('十一'), td('七天假期')))
    )
}
```

理解了属性的基本用法，我们将学习如何让属性变化起来，请看下一章，可观察属性。
