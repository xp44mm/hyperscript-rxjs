# hyperscirpt-rxjs之better list

基于简单列表示例，本文将演示在任意位置插入项目，替换任意位置项目的文本，还可以删除任意项目的更好列表实现。简言之，是一个完整的增删改项目。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

```js
import { ObservableArray } from 'deep-rxjs'
import { button, div, li, textbox, ul } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

export function betterlist() {
    let value = new BehaviorSubject('')
    let root = div(//1
        'new item:', textbox({ value }),
        ul()
    )

    function ith(e) { //2
        let child = e.target.parentNode
        let parent = child.parentNode
        return [...parent.childNodes].indexOf(child)
    }
    
    let items = new ObservableArray()//3
    
    function line(item) { //4
        return li(item,
            button({//5
                disabled: value |> map(value => value === '')
            }, 'insertBefore').pipeEvent('click', //*10
                click$ => click$
                    |> map(e => ith(e))
                    |> withLatestFrom(value)
                    |> (o => o.subscribe(([i, v]) => {
                        items.insertBefore(v, i)
                        value.next('')
                    }))
            ),
            button({//6
                disabled: value |> map(value => value === '')
            }, 'replaceChild').pipeEvent('click', //*10
                click$ => click$
                    |> map(e => ith(e))
                    |> withLatestFrom(value)
                    |> (o => o.subscribe(([i, v]) => {
                        items.replaceChild(v, i)
                        value.next('')
                    }))
            ),

            button('removeChild').subscribeEvent('click', e => {//7
                let i = items.indexOf(item)
                items.removeChild(i)
            }),
        )
    }

    items.insertBefore$.subscribe(([item, i]) => { //5$
        let parent = root.getElementsByTagName('ul')[0]
        let referenceNode = parent.childNodes[i]
        parent.insertBefore(line(item), referenceNode)
    })
    items.replaceChild$.subscribe(([item, i]) => { //6$
        let parent = root.getElementsByTagName('ul')[0]
        let textNode = parent.childNodes[i].childNodes[0]
        textNode.nodeValue = item
    })
    items.removeChild$.subscribe(i => {//7$
        let parent = root.getElementsByTagName('ul')[0]
        let child = parent.childNodes[i]
        parent.removeChild(child)
    })

    items.insertBefore('Alpha') //8
    items.insertBefore('Beta')
    items.insertBefore('Gamma')

    return root //9
}

```

1. 定义本函数要返回的元素，一个文本框用于输入新项目，此时只有一个空`ul`无序列表。不要直接操作DOM元素，而要订阅模型数据的变化，通过变化修改元素的子元素。
2. 一个辅助函数，用于根据按钮事件参数查找按钮所在项目的索引。
3. 这是一个可观察数组，会通知数组的改变，包括插入，替换，删除元素。位于包`deep-rxjs`中，参见专门的说明文档。 
4. 根据项目数据，生成项目视图的函数。这是一个列表项目，包括文本，三个按钮，分别是插入，替换，删除。
5. `insertBefore`按钮，操作后台数据`items`，它首先找到所处的索引，然后在索引位置为后台数组插入元素。可观察数组自动发出一个通知，你只需订阅`insertBefore$`来响应这个通知。传递过来的数据就是调用`insertBefore`所使用的参数。根据`item`我们可以创建视图`line(item)`。通过`ul`元素，加上索引找到`li`元素，最后用`node.insertBefore`完成对DOM的插入操作。
6. `replaceChild`按钮，操作后台数据`items`，它首先找到所处的索引，然后用新提供的文本修改在索引位置的元素。可观察数组自动发出一个通知，你只需订阅`replaceChild$`来响应这个通知。传递过来的数据就是调用`replaceChild`所使用的参数。我们找到文本节点，并修改节点值为新的项目值。
7. `removeChild`按钮，操作后台数据`items`，它首先找到所处的索引，然后移除索引位置的元素。可观察数组自动发出一个通知，你只需订阅`removeChild$`来响应这个通知。传递过来的数据就是调用`removeChild`所使用的参数。我们找到DOM元素移除之。
8. 初始化可观察数组，添加3个元素。
9. 最后返回DOM元素。
10. 这里演示了`element.pipeEvent`，用管道处理数据，订阅数据，执行副作用。最后返回事件的目标元素，所以可以流式接口，直接用在元素树中。

在浏览器中运行程序，查看html

```html
<div>new item:
    <input type="text">
    <ul>
        <li>Alpha
            <button disabled="">insertBefore</button>
            <button disabled="">replaceChild</button>
            <button>removeChild</button>
        </li>
        <li>Beta
            <button disabled="">insertBefore</button>
            <button disabled="">replaceChild</button>
            <button>removeChild</button>
        </li>
        <li>Gamma
            <button disabled="">insertBefore</button>
            <button disabled="">replaceChild</button>
            <button>removeChild</button>
        </li>
    </ul>
</div>
```

