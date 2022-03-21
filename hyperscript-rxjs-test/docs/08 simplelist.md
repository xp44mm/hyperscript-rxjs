# hyperscirpt-rxjs之simple list

这个示例需要`ObservableArray`类型，它位于`deep-rxjs`库中。此类型扩展了数组，新增三个方法，这些方法，当增删改时，会发出通知。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

注意添加按钮只有在文本框中有文字时才会被启用。

```js
import { ObservableArray } from 'deep-rxjs'
import { button, div, li, textbox, ul } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

export function simplelist() {
    let items = new ObservableArray()
    items.insertBefore$.subscribe(([item, i]) => {
        let parent = root.getElementsByTagName('ul')[0] //1
        parent.insertBefore(li(item), null)
    })
    let value = new BehaviorSubject('')
    let root = div(
        'new item',
        textbox({ value }),
        button({
            disabled: value |> map(value => value === '') //2
        }, 'Add')
            .subscribeEvent('click', e => {
                items.insertBefore(value.value) //3
                value.next('')
            }),
        ul()
    )

    items.insertBefore('Alpha') //4
    items.insertBefore('Beta')
    items.insertBefore('Gamma')

    return root
}
```

1. 此例中，我们知道root中有且只有一个ul元素，所以直接取结果数组中的唯一元素。
2. 当文本框为空时，插入数据按钮的被禁用。
3. 按钮事件为插入文本框的当前值。
4. `insertBefore$`的订阅方法必须在root声明以后执行，否则会运行时错误，root没有声明。

在浏览器中运行程序，查看html

```html
<div>
    new item<input type="text">
    <button disabled="">Add</button>
    <ul>
        <li>Alpha</li>
        <li>Beta</li>
        <li>Gamma</li>
    </ul>
</div>
```

