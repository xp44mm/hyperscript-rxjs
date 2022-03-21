# hyperscript-rxjs之Observable props

我们已经知道如何用javascript代码编写html dom元素，和html一样的网页。这不足为奇，网页的神奇之处，在于它是动的，可以交互。要网页变化，前面我们在textNode一章中，已经演示了秒表页面，通过文字变化改变网页。另一个改变网页的手段是改变元素节点的属性。我们通过`Observable`来封装网页的变化。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

当属性值是observable时，此元素的该属性就订阅了observable发出的数据值，作为属性值。Observable一切输出的变化都会反映在元素的属性上。

我们实现一个网页，这个网页的用背景颜色的变化，提示给用户成功或失败。css

```css
.success {
    background: #A5D6A7
}

.failed {
    background: #EF9A9A
}
```

## 第1种方法

```js
import { p, textNode } from 'hyperscript-rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import '../css/classprop.css';

export function observableprop1() {
    const numbers = interval(1000) //1
    return p({
        className: numbers //2
            |> map(n => n % 2 === 1 ? 'success' : 'failed')
    }, textNode('observable prop'))
}
```

1. 每秒发射一个整数的Observable
2. 段落的类名属性当observable通知单数时为成功类，双数时为失败类。

本程序要注意的是`className`直接使用可观察流管道来配置。这个程序有个小遗憾，程序启动瞬间背景是非红非绿的白色，如果比较完美主义，我们可以调整一下。

```js
export function observableprop1() {
    const numbers = interval(1000)
    let elem = p({
        className: numbers |> map(i => i % 2 === 1 ? 'success' : 'failed')
    }, textNode('observable prop'))
    elem.className = 'success' //*
    return elem
}
```

这段代码说明，不是元素属性等于observable本身，而是元素的属性值被observable流中的数据来修改。

当元素绿色时`<p class="successs" ...`

当元素红色时`<p class="faild" ...`

## 第2种方法

利用类选择器来实现同一功能：

```js
export function observableprop1() {
    const numbers = interval(1000)
    let elem = p({
        className: 'success',
        '.failed': numbers |> map(n => n % 2 === 1)
    }, textNode('observable prop'))
    return elem
}
```

虽然页面效果一样，但是背后的html输出却有差别。成功类一直在，失败类可能添加到类末尾，也可能从类中移除。

当元素绿色时`<p class="successs" ...`

当元素红色时`<p class="successs faild" ...`

这里的原理是，同级样式表冲突，后来者赢。

## 第3种方法

利用样式属性来实现同一功能：

```js
export function observableprop1() {
    const numbers = interval(1000)
    let elem = p({
        className: 'success',
        'style.backgroundColor': numbers 
            |> map(n => n % 2 === 1 ? '#A5D6A7' : '#EF9A9A')
    }, textNode('observable prop'))
    return elem
}
```

直接用样式属性设置背景色，亦可以实现同样的功能。相比较而言，语义性弱一些，颜色值在js中是一串文本，也无法像在css中一样可以直观的预览。

至此，我们设置了`textNode`文本内容`nodeValue`的变化，也设置了元素属性的变化，网页文档另一半重要的变化主角就是事件，`hyperscript-rxjs`仍然可以无缝的封装变化。详见下一章。