# hyperscript-rxjs之序列化ObservableArray

使用restore恢复ObservableArray模型，需要提供ObservableArray如何添加新成员的方法，因为javascript是弱类型语言，它不知道新成员如何构建。

我们使用一个记录圆形列表的程序演示用法。这个示例是讲一个圆形的列表，记录了不同的直径。

## 模型

圆模型

```js
import { BehaviorSubject } from 'rxjs'

export class CircleViewModel {
    constructor() {
        this.diameter = new BehaviorSubject(0)
    }
}

```

圆列表模型

```js
import { ObservableArray } from 'deep-rxjs'
import { CircleViewModel } from './CircleViewModel'

export class CircleListViewModel {
    constructor() {
        this.circles = new ObservableArray()
        this.circles.appendChild = i => 
        	this.circles.insertBefore(new CircleViewModel(), i)
    }
}
```

`CircleListViewModel`有一个可观察数组`circles`保存圆的列表。当`restore`需要扩充可观察数组时，会调用`appendChild`成员，构造新元素，并附加到末尾。i始终等于数组的长度，为了避免`insertBefore`重复计算数组长度，所以由参数给出。

## 视图

下面是视图的代码

```js
import { pickBehaviorSubject, restore } from 'deep-rxjs'
import { button, div, li, numberbox, textNode, ul } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { CircleViewModel } from '../model'
import { CircleListViewModel } from '../model/CircleListViewModel'

export function circlelist(model = new CircleListViewModel()) {
    //1
    model.circles.insertBefore$.subscribe(([item, i]) => {
        let parent = root.getElementsByTagName('ul')[0]
        parent.insertBefore(li(textNode(item.diameter)), null)
    })

    let number = new BehaviorSubject(0)

    let root = div(
        'new circle',
        numberbox({ number }),
        button({
            disabled: number |> map(n => n <= 0)
        }, 'Add')//2
            .subscribeEvent('click', e => {
                let circle = new CircleViewModel()
                circle.diameter.next(number.value)
                model.circles.insertBefore(circle)
                number.next(0)
            }),
        ul(), //3
        div(
            button('save').subscribeEvent('click', e => {
                let data = pickBehaviorSubject(model)
                console.log(data)
            }),

            button('restore').subscribeEvent('click', e => {
                let data = { 
                    circles: [{ diameter: 7 }, { diameter: 8 }, { diameter: 9 }]
                }
                restore(model, data) //4
            })
        )
    )

    return root
}

```

1. 订阅模型变化对本视图的响应。
2. 添加按钮只需要修改视图模型，因为视图是自动修改。
3. `ul`开始为空，当模型数组`circles`添加项目时，方法发出通知给订阅者，向`ul`添加子元素。添加的方法在`model.circles.insertBefore$.subscribe`中。
4. 重置模型。使用`restore`，第一个参数是模型，第二个参数是要恢复的数据，是`pickBehaviorSubject`的反函数。

## 参考

`ObservableArray`，`pickBehaviorSubject`和`restore`函数位于`deep-rxjs`库，文档见xp44m/deep-rxjs/docs/deep rxjs api