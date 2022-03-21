# hyperscript-rxjs开始

> 本文及源代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

## 标签名函数

熟悉html的读者知道，html元素由标签名，属性，子元素组成。我们用标签函数转义html元素。例如：

```html
<button class="btn-primary">OK</button>
```

`button`是标签名，`class="btn-primary"`是属性，`OK`是子元素。转换为标签名函数为：

```js
button({className:"btn-primary"},"OK")
```

> 属性名与DOM一致，而非与html一致。所以上面代码的属性名是`className`而非`class`。详见props解释。

据此，我们给出标签名的一般语法。

```js
tagName(props={}, ...childNodes=[])
```

### tagName

A string that specifies the type of element to be created. The `nodeName` of the created element is initialized with the value of tagName. Don't use qualified names (like `"html:a"`) with this method. Although `tagName` are case insensitive, lowercase is recommended.

### props

If a plain object `{}` is passed in it will be used to set properties.

```js
import { a } from 'hyperscript-rxjs'
a({href: 'https://github.com/xp44mm/hyperscript-rxjs-test'}, 'hyperscript-rxjs')
```

Note that hyperscript sets properties on the DOM element object, not attributes on the HTML element. 

There are some gotchas, however. Attributes such as `colspan` are camel cased to `colSpan`, and `for` on the label element is `htmlFor` to avoid collision with the language keyword.

属性对象应该是普通对象，当此位置的参数是DOM元素对象，string，或数组，都表示childNodes参数的开始，而属性对象被省略，被设为`{}`空对象。

```js
p('hyperscript')
```

#### 级联属性

大多数时候，属性名是简单的一个标识符，不必用引号包裹起来。但是我们如何设置属性对象的一个属性呢？比如我们设置：

```js
elem.style.backgroundColor = 'red'
```

此时，当属性指向DOM元素属性的属性时，我们叫做级联属性。级联属性名用点号分隔：

```js
p({'style.backgroundColor':'red'},'some text')
```

> 属性值应该是标量，而不是组合的对象。

#### 类选择器属性

以点号开头的属性名是类选择器属性。属性值接受一个布尔值。为真表示此类名出现。为假表示此类名缺席。

```js
p({'.success':false, '.failed': true }, 'some text')
```

对应的html为

```html
<p class="failed">some text</p>
```


### childNodes

fragment中的所有子节点。可以是一个数组，或是散列的文本或节点。

> Child nodes include elements, text and comments. 因为我们直接操作DOM，基本排除注释节点。

#### string

If an argument is a string, a `TextNode` is created in that position.

```js
p('this is a paragraph.')
```

#### Node

If a argument is a `Node`, for example, the return value of a call to `p`.

```js
div(p('this is a paragraph.'))
```

#### ...childNodes

子元素散列在父元素中。

```js
ul(
    li('this is a item.'),
    li('this is another item.'),
)
```

####  Array

整个childNodes参数整体是一个数组。

Each item in the array is treated like a ordinary child. (string or Node) this is useful when you want to iterate over an object:

```js
import { table,tr,th,td } from 'hyperscript-rxjs'
var obj = {
  a: 'Apple',
  b: 'Banana',
  c: 'Cherry',
  d: 'Durian',
  e: 'Elder Berry'
}
table([
  tr(th('letter'), th('fruit')),
  ...Object.keys(obj).map(function(k) {
    return tr(
      th(k),
      td(obj[k]),
    )
  })
])
```

childNodes数组的元素只能是`string|Node`，不可以嵌套另一个数组。为了代码清晰，子元素只有最外一层数组，不可以只包含部分元素的数组。当数组中嵌套有数组出现时，用展开操作符即时展开。


> #### parseHtml
> 
> 通常情况下，我们可能已经有了写好的html标签页，我们不必从零开始编写代码，有一个小程序可以将html翻译成hyperscirpt格式，见xp44mm/parse-html仓库

虽然标签函数能满足大部分场景，然而，罕见的场景也是要考虑到。比如由于语言的限制，有些标签是javascript的关键字，比如`var`元素，不可以使用。再者，如果用户想重新定义控件的行为，那也必须用到更底层的功能。

## hyperscript

标签函数实际都是对一个底层函数的包装。这个函数是`hyperscript`，它的语法如下：

```js
hyperscript(tagName,props={}, ...childNodes=[])
```

tagName是一个字符串指定元素的名称，props是元素的属性，childNodes是元素的子节点。他们的用法与其在标签名函数中的用法一致，不再复述。

比如，我们要构建一个`var`元素。

```js
hyperscript('var','for')
```

## fragment

Creates and returns a new `DocumentFragment` object. 此函数的语法为

```js
fragment(...childNodes)
```

### childNodes

fragment中的所有子节点。可以是一个数组，或是散列的文本或节点。

