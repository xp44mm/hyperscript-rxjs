# hyperscript-rxjs之event

网页不仅能够显示内容，而且他能收集用户操作。这是它更大的魅力。收集用户操作是通过event实现的。DOM标准的事件有两种实现方式，一种是`onevent`属性，另一种是元素的`addEventListener`方法。根据DOM标准的描述，我们抛弃前者，选择后者。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

我们在构建框架一章，已经接触过事件，文档的加载事件。

```js
document.addEventListener('DOMContentLoaded', function () {
})
```

我们已经通过`rxjs`和`hyperscript-rxjs`将事件处理进行封装，除非前端框架的维护者，前端库的用户不必在意event标准中的细节。

## 管道事件成员

所有`hyperscript`函数，包括快捷元素函数，他们生成的元素都有两个事件接口，一个是事件后面接订阅者函数：

```js
element.pipeEvent(type, subscriber)
```

用订阅者管道流处理元素的源事件，并订阅流。

`type` is a case-sensitive string representing the event type to listen for.

> 事件类型的列表，参见MDN。

`subscriber(event$):Subscription`是一个函数参数，输入参数是指`pipeEvent`生成的源事件observable，一直到订阅的observer。

## 订阅事件成员


第二个事件接口：

```js
element.subscribeEvent(type, observer)
```

用观察者订阅元素的源事件。

observer参数同`Observable.subscribe`的参数。

## 示例

最典型的事件是按钮的点击事件。我们用按钮点击事件来说明这两个方法的用法。

首先看简单的`subscribeEvent`，这个示例按钮修改网页文本的正文。

```js
import { button, div, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

export function buttonclick() {
    let intro = new BehaviorSubject('introduce')

    return div(
        div(textNode(intro)),
        button('modify').subscribeEvent('click', e => {
            intro.next('modify')
        }),
    )
}
```

注意`subscribeEvent`是流利接口的，此接口仍会返回目标元素，本例中返回修改按钮元素。

继续这个例子，演示`pipeEvent`，请把下面的按钮放在前面按钮的后面。

```js
        button('save').pipeEvent('click', click$ =>
            click$
            |> withLatestFrom(intro) //1
            |> map(([_, data]) => data) //2
            |> (o => o.subscribe(data => {
                console.log(data)
            }))
        )
```

1. `click$`事件可观察连接`intro`可观察的最新值
2. 仅保留`intro`的值

这个保存按钮，点击事件发生，它组合正文文本的当前值，并进行映射，抛弃事件的参数，最后在订阅者中打印出网页的正文到控制台。和`subscribeEvent`一样，`pipeEvent`是流利接口的，仍然返回目标元素，本例中返回保存按钮元素。

