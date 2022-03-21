`hyperscript-rxjs`是一个直接操作DOM的js前端框架库。`hyperscript-rxjs`具有如下特点：

* 相比操作DOM模型的命令式代码，`hyperscript-rxjs`更具声明性。

* `hyperscript-rxjs`修复或绕开了很多DOM的历史缺陷。

* 像knockout一样，`hyperscript-rxjs`使用MVVM分离视图与视图模型，不同的是`hyperscript-rxjs`采取通用的rxjs库来观察变化。

* 像react一样，`hyperscript-rxjs`操作DOM，与html无关。不同的是`hyperscript-rxjs`直接操作DOM本身，无虚拟DOM。

* `hyperscript-rxjs`采用更新的事件标准`addEventListener`，不采用属性事件`onevent`。采用rxjs观察DOM模型的变化，事件通知。

* 尽管rxjs是技术发展趋势，用户仍然可以基于`hyperscript-rxjs`实现代码，渐进实现不依赖任何框架的代码。

`hyperscript-rxjs`学习难度小于react，并且其知识兼容底层的DOM，实用性更强。教程见单独的文件。

## 依赖库

`hyperscript-rxjs` is based on `rxjs`。

## 入门

一个Hello World程序，就像写html一样简单。

```js
import { p } from 'hyperscript-rxjs'
export function hello() { return p('hello world!'); }
```

本框架API的设计和DOM底层完全一致，即使你将来不使用本框架，也会有益于你的职业生涯。本教程的其余部分将更加详细地涵盖前端库的各种功能以及其它高级用法。

## 教程

教程及其源代码位于github库`xp44mm/hyperscript-rxjs-test`中。

## 相关库

推荐使用如下库，编写更优美的代码：

xp44mm/structural-comparison

xp44mm/deep-rxjs

xp44mm/parse-html

