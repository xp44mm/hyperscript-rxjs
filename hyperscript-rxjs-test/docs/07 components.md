# hyperscript-rxjs之components

除了窗体控件，我们也包装了常用的交互组件。这些组件的特点是它会显示或隐藏元素的一部分。

> 本文及示例代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

> 运行示例代码的方法，见第0章，框架的创建。

有些组件会导致一些元素不可见，本章的程序必须引用css样式，并保持它不被覆盖：

```css
.hidden, [hidden] {
    display: none;
}
```

## 折叠（collapse）

显示或隐藏元素。语法

```js
collapse(hidden, ...elements)
```

要显示的元素或元素数组，注意根元素不可以是文本节点，因为文本节点没有属性设置类名。本章之后的组件成员也有如此性质。

要么显示，要么隐藏的控件。

```js
import { checkbox, collapse, div, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export const collapseTest = () => {
    let hidden = new BehaviorSubject(false)
    hidden.subscribe(h => { console.log(h) })

    return div(
        textNode('collapse Test'),
        checkbox({ checked: hidden }),
        ...collapse(hidden, div('first'), div('second'))
    )
}
```

最后一行的`collapse`是折叠控件。`showed`是可观察，其中的值用于确定随后的参数是否显示。后面的参数是`childNodes`一样的输入规则。collapse就返回这些元素的数组。测试程序，可见当`showed`为真时，会显示所有元素，反之隐藏之。再查看html代码，

```html
<div>
    collapse Test<input type="checkbox">
    <div hidden="">first</div>
    <div hidden="">second</div>
</div>
```

注意，html元素只要出现`hidden`它的值一定是真，不管设置为什么字符串。反之，只要不出现，`hidden`属性的值一定为假。

实际上，html树并没有`collapse`组件。返回的子元素散列在`div`父元素中。注意，参数数组的元素一定是元素，不能为文本节点，因为文本节点不能设置`class`属性。

## 翻板（flip）

要么显示阴面，要么显示阳面的控件。语法

```js
flip(hideYin, yin, yang)
```

`hideYin`是一个`Observable`类型，yin是一个或多个元素，yang是一个或多个元素。`hideYin`值为真隐藏`yin`。为假隐藏`yang`。

```js
import { button, div, flip, span, textbox, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export const fliptest = () => {
    let hideYin = new BehaviorSubject(true)
    let value = new BehaviorSubject('hello world!')
    
    return div(
        button('flip').subscribeEvent('click', e => {
            hideYin.next(!hideYin.value)
        }),
        ...flip(hideYin,
            textbox({ value }), //yin
            span(textNode(value)), //yang
        )
    )
}
```

最后一个元素`flip()`是二选一的翻板控件。`hideYin`是一个可观察，当其为真表示隐藏第一个参数，并显示第二个参数。当其为假表示隐藏其后第二个参数，并显示其后第一个参数。`flip`实际即返回yin，又返回yang他们连接为一个数组。数组中的每个根元素由`hidden`属性控制元素可见性。测试程序，查看html代码。

```html
<div>
    <button>flip</button>
    <input type="text">
    <span hidden="">hello world!</span>
</div>
```

注意，参数数组的元素一定是元素，不能为文本节点，因为文本节点没有属性。无法隐藏。

## 选择（choice）

每个可能性可以是元素，也可以是元素数组，最后返回元素数组

```js
choice(chosen, possibilities)
```

possibilities是一个普通对象，每个属性值是要显示的元素或元素数组，注意不可以是文本节点，因为文本节点没有属性设置类名。chosen是一个可观察，它指示possibilities的一个属性值。

```js
import { button, choice, div, span, textbox, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export const choicetest = () => {
    let chosen = new BehaviorSubject('yin')

    let value = new BehaviorSubject('hello world!')

    let possibilities = {
        yin: div(
            textbox({ value }),
            button('go to').subscribeEvent('click', e => {
                chosen.next('yang')
            }),
        ),
        yang: div(
            span(textNode(value)),
            button('go to').subscribeEvent('click', e => {
                chosen.next('yin')
            }),
        ),
    }
    return choice(chosen, possibilities)
}
```

运行程序，生成的html

```html
<div id="root">
    <div>
        <input type="text">
        <button>go to</button>
    </div>
    <div hidden="">
        <span>hello world!</span>
        <button>go to</button>
    </div>
</div>
```

注意，`choice`返回的是元素数组。按钮看起来是一个切换按钮，实际上是两个不同的按钮。

## 选项卡（tabControl）

语法

```js
tabControl({tabIndex}, tabs, panels)
```

`tabIndex`用于指定被激活页面的索引。`tabs`用于指定选项卡导航栏按钮。`panels`用于指定选项卡面板页面。

欲首先，选项卡需要css支持，这些支持可以从`hyperscript-rxjs-test`中找到。

```css
.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

.nav-link {
    display: block;
    padding: 0.5rem 1rem;
}

    .nav-link:hover, .nav-link:focus {
        text-decoration: none;
    }

    .nav-link.disabled {
        color: #6c757d;
        pointer-events: none;
        cursor: default;
    }

.nav-tabs {
    border-bottom: 1px solid teal;
}

    .nav-tabs .nav-item {
        margin-bottom: -1px;
    }

    .nav-tabs .nav-link {
        border: 1px solid transparent;
        border-radius: 0;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;

    }

        .nav-tabs .nav-link:hover, 
        .nav-tabs .nav-link:focus {
            border-color: #e9ecef #e9ecef teal;
        }

        .nav-tabs .nav-link.disabled {
            color: #6c757d;
            background-color: transparent;
            border-color: transparent;
        }

        .nav-tabs .nav-link.active,
        .nav-tabs .nav-item.show .nav-link {
            color: #495057;
            background-color: #fff;
            border-color: teal teal #fff;
        }

    .nav-tabs .dropdown-menu {
        margin-top: -1px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

    }

.nav-pills .nav-link {
    border-radius: 0.25rem;
}

    .nav-pills .nav-link.active,
    .nav-pills .show > .nav-link {
        color: #fff;
        background-color: #0d6efd;
    }

.nav-fill .nav-item {
    flex: 1 1 auto;
    text-align: center;
}

.nav-justified .nav-item {
    flex-basis: 0;
    flex-grow: 1;
    text-align: center;
}

.tab-content > .tab-pane {
    display: none;
}

.tab-content > .active {
    display: block;
}
```

这是静态的选项卡组件的使用代码

```js
import { BehaviorSubject } from 'rxjs'
import { tabControl } from 'hyperscript-rxjs'

export function tabControlTest() {
    ///選項卡面板標題
    const tabtags = ['Home', 'Profile', 'Contact']
    ///選項卡面板内容
    const sheets = [
        "Raw",
        "Food",
        "Messenger",
    ]
    let tabIndex = new BehaviorSubject(0)
    return tabControl({ tabIndex }, tabtags, sheets)
}
```

根据`tabIndex`的`Observable`。它传递整数数据流，确定navs和sheets的哪个页面是激活页。

运行程序，html

```html
<div>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <button type="button" class="btn btn-link nav-link active">Home</button>
        </li>
        <li class="nav-item">
            <button type="button" class="btn btn-link nav-link">Profile</button>
        </li>
        <li class="nav-item">
            <button type="button" class="btn btn-link nav-link">Contact</button>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active">Raw</div>
        <div class="tab-pane">Food</div>
        <div class="tab-pane">Messenger</div>
    </div>
</div>
```

此时，第一页是激活页。我们通过点击不同选项卡的按钮，将切换面板。

