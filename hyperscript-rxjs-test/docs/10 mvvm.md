# hyperscript-rxjs之mvvm

随着程序功能越来越强大，代码越来越复杂，是时候将代码分割，放到项目的不同文件中，最常见的模式是mvvm。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

我们用一个嵌套的可变数组演示，如何分割代码。

首先，我们定义视图模型，这是一个`Person`类：

```js
class Person {
    constructor() {
        this.name = new BehaviorSubject('new Person')
        this.children = new ObservableArray()
    }
}
```

这是根视图模型：

```js
class ViewModel {
    constructor() {
        this.people = new ObservableArray()
    }
}
```

这是显示`Person`的视图：

```js
function personView(person = new Person()) {
    let root = li(
        div(
            span(textNode(person.name)),
            textNode(" has "),
            span(textNode(
                person.children.insertBefore$ 
                |> mergeMap(() => of(person.children.length))
            )),
            textNode(" children: "),
            a({ href: "#", }, "Add child").subscribeEvent('click', e => {
                person.children.insertBefore("New child")
            }),
        ),
        ul(),
    )

    let container = root.getElementsByTagName('ul')[0]
    person.children.insertBefore$.subscribe(([name]) => {
        container.insertBefore(li(name), null)
    })

    return root
}
```

这是最终的视图：

```js
export function mvvm(vm = new ViewModel()) {
    let root = div(
        h2("People"),
        button('add person').subscribeEvent('click', e => {
            vm.people.insertBefore(new Person())
        }),
        ul(),
    )

    let container = root.getElementsByTagName('ul')[0]

    vm.people.insertBefore$.subscribe(([person]) => {
        container.insertBefore(personView(person), null)
    })

    return root
}
```

在浏览器中运行程序，查看html。

```html
<div>
    <h2>People</h2>
    <button>add person</button>
    <ul>
        <li><div><span>new Person</span> has <span>1</span> children: 
            <a href="#">Add child</a>
            </div>
            <ul>
                <li>New child</li>
            </ul>
        </li>
    </ul>
</div>
```

程序初始化时，没有`ul`项目，这是每层各添加一个成员后的html
