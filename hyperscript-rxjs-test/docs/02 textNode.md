## hyperscript-rxjs之textNode

> 本文及源代码都在github上，见`xp44mm/hyperscript-rxjs-test`仓库。

> 运行示例代码的方法，见第0章，框架的创建。

Creates a new `Text` node. This method can be used to escape HTML characters.

其语法为

```js
textNode(nodeValue)
```

唯一参数nodeValue用于指定文本节点的文本。

前面我们用标签函数创建一个段落，

```js
p('some text')
```

这个段落元素，属性缺省为`{}`，并用一个string作为段落的唯一子节点。读过DOM文档的读者，可能知道这个文本类型的子元素，实际上，它是一个文本节点对象。用啰嗦的方法写是这样的：

```js
p({},textNode('some text'))
```

以上代码用标签函数初始化设置nodeValue为静态的文本。返回的html为

```html
<p>some text</p>
```

仅显示静态文本，这不是textNode的唯一用法，它的文本可以随着程序而改变，要实现这个功能，它可以接受一个`Observable`参数：

```js
import { of } from 'rxjs'
let text$ = of('some text')
p(textNode(text$))
```

这个代码有和前面同样的输出，`textNode`是Observable的一个观察者，他会取出Observable中的值，作为自己的文本内容。

> 注意：只有字符常量可以用字符串代替textNode，`Observable`要输出内容到textNode节点，必须放到textNode创造函数中。

有了Observable作为参数，textNode可以动起来。每当输入参数Observable中数据next变化时，他会自动修改textNode的内容。见下面的代码：

```js
import { p, textNode } from 'hyperscript-rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

export function textNodeExample() {
    const numbers = interval(1000)
    const texts = numbers.pipe(map(x => `Next: ${x}`))
    return p(textNode(texts))
}
```

一般文件命名为导出函数的名称，我们命名这个文件名为`textNodeExample.js`。

### 附录，如何运行

写了代码，最好让其运行，理解才能深刻。我们在第0章，我们介绍了框架的创造方法，有了框架，我们只需要把内容填充到框架里。

我们如何把这个代码放到框架里面运行呢？很简单，只需要修改根目录下的`index.js`文件，引入这个函数名称，并修改elem即可：

```js
import { fragment } from 'hyperscript-rxjs'
import { textNodeExample } from './src/textNodeExample' //*
import './style.css'

let elem = textNodeExample() //*

document.addEventListener('DOMContentLoaded', function () {
    let root = document.getElementById('root')
    let element = elem instanceof Array ? fragment(...elem) : elem
    root.appendChild(element)
})
```

以后的代码运行，都可以这样修改，变化的位置用注释标注出来了，这个代码是自解释的。当文档加载时，首先从模板网页中找到根元素，然后把元素添加到这个根元素中。

我们运行程序，可以见到网页中，秒表每秒钟跳一个数字。

