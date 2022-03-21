# hyperscirpt-rxjs之表单输入

表单输入元素用了一些新的名称，名称遵守元素名称全小写的约定。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

### 文本框（textbox）

```js
import { div, textbox, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function forms() {
    let message = new BehaviorSubject('')
    return div(
        textbox({ value: message, placeholder: 'edit me' }),
        div('Message is: ', textNode(message))
    )
}
```

文本框返回的是`input`元素。

### 多行文本（textarea）

```js
import { br, p, span, textarea, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function forms() {
    let message = new BehaviorSubject('')
    message.subscribe(console.log)

    return [
        span("Multiline message is:"),
        p({
            'style.whiteSpace': "pre-line",
        }, textNode(message)),
        br(),
        textarea({
            value: message,
            placeholder: "add multiple lines",
        }),
    ]
}

```

### 复选框（checkbox）

单个复选框，绑定到布尔值。

```js
import { textNode, checkbox, label } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function forms() {
    let checked = new BehaviorSubject(true)
    checked.subscribe(console.log)

    return [
        checkbox({
            id: "checkbox",
            checked,
        }),
        label({
            htmlFor: "checkbox",
        }, textNode(checked)),
    ]
}

```

多个复选框，绑定到同一个数组：

```js
export function forms() {
    let checkedNames = [] //*1

    let jack = new BehaviorSubject(false) //*2
    let john = new BehaviorSubject(false)
    let mike = new BehaviorSubject(false)

    let result = //*3
        merge(
            jack |> map(x => [x, 'Jack']),
            john |> map(x => [x, 'John']),
            mike |> map(x => [x, 'Mike']),
        )
        |> tap(([ck, name]) => { //*4
            if (ck) {
                checkedNames.push(name)
            } else {
                let i = checkedNames.findIndex(nm => nm === name)
                checkedNames.splice(i, 1)
            }
        })

    return [
        checkbox({
            id: "jack",
            value: "Jack", //*5
            checked: jack,
        }),
        label({
            htmlFor: "jack",
        }, "Jack"),
        checkbox({
            id: "john",
            value: "John",
            checked: john,
        }),
        label({
            htmlFor: "john",
        }, "John"),
        checkbox({
            id: "mike",
            value: "Mike",
            checked: mike,
        }),
        label({
            htmlFor: "mike",
        }, "Mike"),

        br(),

        div(
            "Checked names: ",
            textNode( //*6
                result
                |> mergeMap(() => of(checkedNames.join(',')))
            ),
        )
    ]
}
```

1. 声明后台数组。
2. 声明三个`checkbox`的`checked`后台数据。
3. 把三个`checkbox`统一数据形式，合并成一个数据管道。用`tap`可以确保先修改后台数据，然后再呈现到DOM。
4. 如果选中，把名字加入数组，如果反选，把名字从数组中去掉。
5. `checkbox`控件的`value`属性是可以不设置的，不影响程序的功能。
6. 每次有改变信号时，都要重新读取后台数组。

### 单选按钮（radio）

```js
import { br, div, label, radio, span, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject, merge } from 'rxjs'
import { filter, map } from 'rxjs/operators'

export function forms() {
    let one = new BehaviorSubject(true)
    let two = new BehaviorSubject(false)

    let picked =
        merge(
            one |> map(x => [x, 'One']),
            two |> map(x => [x, 'Two']),
        )
        |> filter(([ck]) => ck)
        |> map(([ck, name]) => name)

    return div({
        id: "example-4",
    }, [
        radio({ id: "one", value: "One", checked: one, name: "drone" }),
        label({ htmlFor: "one", }, "One"),
        br(),
        radio({ id: "two", value: "Two", checked: two, name: "drone" }),
        label({ htmlFor: "two", }, "Two"),
        br(),
        span("Picked: "), textNode(picked)
    ])
}
```

### 选择框（select）

单选绑定值：

```js
import { option, select, span, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function forms() {
    let value = new BehaviorSubject('')

    return [
        select({
            value
        }, [
            option({ disabled: true, value: "", }, "please select"),
            option("A"),
            option("B"),
            option("C"),
        ]),
        span("Selected: "), textNode(value)
    ]
}
```

单选绑定索引：

```js
function selectforms() {
    let selectedIndex = new BehaviorSubject(0)

    return [
        select({
            selectedIndex
        }, [
            option({ disabled: true, value: "", }, "please select"),
            option("A"),
            option("B"),
            option("C"),
        ]),
        span("Selected: "), textNode(selectedIndex)
    ]
}
```

多选时：

```js
import { div, hyperscript, option, span, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function forms() {
    let a = new BehaviorSubject(false)
    let b = new BehaviorSubject(false)
    let c = new BehaviorSubject(false)

    return [
        hyperscript('select', {
            multiple: true, style: "width: 50px;"
        }, [
            option({ selected: a }, "A"),
            option({ selected: b }, "B"),
            option({ selected: c }, "C"),
        ]).subscribeEvent('input', e => {
            let ss = e.target
            let aa = ss[0].selected
            let bb = ss[1].selected
            let cc = ss[2].selected

            if (a.value !== aa) a.next(aa)
            if (b.value !== bb) b.next(bb)
            if (c.value !== cc) c.next(cc)
        }),
        div(
            span("Selected: "),
            textNode(a),
            textNode(b),
            textNode(c),
        )
    ]
}
```

### 数值输入框（numberbox）

html没有输入`number`的控件，我们简单用`textbox`包装了一个：

```js
import { BehaviorSubject } from 'rxjs'
import { numberbox } from 'hyperscript-rxjs'

export const numberboxTest = () => {
    let number = new BehaviorSubject(0)
    number.subscribe(console.log)
    return numberbox({ number })
}
```

说明`numberbox`控件直接绑定模型数据是number类型的，而不像`textbox`控件是`string`类型的。控件实际是`input`元素，增加了一个自定义的属性`number`保存当前值。当控件失去焦点时，更新模型的数据值。可以打开控制台已测试模型数据的输出。

