# hyperscript-rxjs之序列化和解序列化

随着前端程序变得越来越复杂，我们将程序按照MVVM模式分成三部分，前端用于收集用户的输入，我们必须把用户输入保存下来，以便将来以此为基础继续工作。用户保存数据在编程界叫做序列化，恢复数据叫做解序列化。

这个程序的功能是一个计算形状面积和周长的计算器，形状可能是圆形或方形。我们采用自底向上的方法写这个程序，先分别编写圆形，方形，然后把它们装配在一起。

## 圆形

模型

```js
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

export class CircleViewModel {
    constructor() {
        this.diameter = new BehaviorSubject(0)
        this.area = this.diameter |> map(d => Math.PI / 4 * d ** 2)
        this.peri = this.diameter |> map(d => Math.PI * d)
        this.dimension = this.diameter |> map(d => `φ${d}`)
    }
}
```

视图

```js
import { div, numberbox } from 'hyperscript-rxjs'
import { CircleViewModel } from '../model'

export function circleInput(model = new CircleViewModel()) {
    return div('直径', numberbox({ number: model.diameter }))
}
```

此时，圆形的代码即构建成为单独的模块，就可以单独测试圆形输入`circleInput`

为了显示周长，面积的计算结果，我们继续创建结果视图：

```js
import { div, textNode } from 'hyperscript-rxjs'

export function result(model) {
    return div(
        div('周长:', textNode(model.peri)),
        div('面积:', textNode(model.area)),
    )
}
```

将圆形输入视图，计算结果视图合并在一起：

```js
import { div } from 'hyperscript-rxjs'
import { CircleViewModel } from '../model/CircleViewModel'
import { circleInput } from './circleInput'
import { result } from './result'

export function circleView() {
    let model = new CircleViewModel()
    return div(
        circleInput(model), 
        result(model)
    )
}
```

运行`circleView`，查看它的html

```html
<div>
    <div>直径<input type="text" style="text-align: right;"></div>
    <div>
        <div>周长:31.41592653589793</div>
        <div>面积:78.53981633974483</div>
    </div>
</div>
```

## 方形

模型

```js
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class RectangleViewModel {
    constructor() {
        this.width = new BehaviorSubject(0)
        this.height = new BehaviorSubject(0)
        this.area =
            combineLatest([this.width, this.height])
            |> map(([w, h]) => w * h)
        this.peri =
            combineLatest([this.width, this.height])
            |> map(([w, h]) => 2 * (w + h))
        this.dimension =
            combineLatest([this.width, this.height])
            |> map(([w, h]) => `${w}×${h}`)
    }
}
```

视图

```js
import { div, numberbox } from 'hyperscript-rxjs'
import { RectangleViewModel } from '../model'

export function rectangleInput(model = new RectangleViewModel()) {
    return div(
        '宽', numberbox({ number: model.width }), 
        '高', numberbox({ number: model.height })
        )
}
```

## 形状(圆形或方形)

这一节是新内容，重点。

模型

```js
import { BehaviorSubject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { CircleViewModel } from './CircleViewModel'
import { RectangleViewModel } from './RectangleViewModel'

export class ShapeViewModel {
    constructor() {
        this.rectangle = new RectangleViewModel()
        this.circle = new CircleViewModel()
        this.kind = new BehaviorSubject('rectangle') //: 'rectangle' | 'circle'
        this.area = this.kind |> mergeMap(kind => this[kind].area)
        this.peri = this.kind |> mergeMap(kind => this[kind].peri)
        this.dimension =
            this.kind
            |> mergeMap(k => this[k].dimension)
    }
}
```

此类中包括`kind`字符属性，这种数据结构在函数式编程中，叫可区分联合。形状可区分联合，要么是圆形，要么是方形。

视图

```js
import { pickBehaviorSubject, restore } from 'deep-rxjs'
import { button, choice, div, option, select } from 'hyperscript-rxjs'
import { ShapeViewModel } from '../model'
import { circleInput } from './circleInput'
import { rectangleInput } from './rectangleInput'
import { result } from './result'

let kinds = ['rectangle', 'circle']

export function shapeInput(model = new ShapeViewModel()) {
    let options = kinds.map(text => option({ text }))

    return div(
        '形状',select({ value: model.kind }, options),
        ...choice(model.kind, {
            circle: circleInput(model.circle),
            rectangle: rectangleInput(model.rectangle),
        }),
        result(model),
    )
}

```

本例演示了`choice`的用法，根据`kind`，要么输入圆形，要么输入方形。

## 序列化和解序列化

我们本章演示序列化和解序列化，

让我们为形状的模型添加功能：

```js
export class ShapeViewModel {
    constructor() {
    }
    pickeys() {
        return ['kind', this.kind.value]
    }
}
```

`pickeys`是一个函数，拾取类中要保存的键名数组。为了避免重名，故意合并了两个`k`，这是实例方法，当需要时才会计算，另外也可以为同样类的不同实例指定不同的方法。

`ShapeViewModel`一定会保存kind属性，另外会根据kind的取值，保存矩形或方形属性之一。

添加视图代码

```js
import { pickBehaviorSubject, restore } from 'deep-rxjs'

export function shapeInput(model = new ShapeViewModel()) {
    return div(

        div(
            button('保存').subscribeEvent('click', e => {
                let data = pickBehaviorSubject(model)
                console.log(data)
            }),

            button({}, '重置').subscribeEvent('click', e => {
                let data = { kind: 'rectangle',rectangle: { width: 10, height: 20 }}
                restore(model, data)
            })
        )
    )
}

```

我们用到两个函数`pickBehaviorSubject`和`restore`，这两个函数位于`deep-rxjs`库中。

我们运行程序，点击保存。打开控制台，查看输出的数据，保存之。点击重置，注意界面的变化。

## 参考

`choice`控件见xp44m/hyperscript-rxjs-test/docs/components

`pickBehaviorSubject`和`restore`函数见xp44m/deep-rxjs/docs/deep rxjs api

