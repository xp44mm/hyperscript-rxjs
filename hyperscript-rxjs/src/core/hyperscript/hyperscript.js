import { pipeEvent, subscribeEvent } from './event'
import { hyperscriptArgs } from './hyperscriptArgs'
import { isNode } from './isNode'
import { setProps } from './setProps'

/**
 * 輸入元素名，屬性，子元素。
 * @param {any} elem
 * @param {...any} args == props?, childNodes
 */
export function hyperscript(elem, ...args) {
    let element = document.createElement(elem)

    let { props, childNodes } = hyperscriptArgs(args)

    setProps(element, props)

    //支持子元素包含在数组中：fn([a,b,c]), fn(a,b,c)
    childNodes =
        childNodes.length === 1 && Array.isArray(childNodes[0])
            ? childNodes[0]
            : childNodes

    // append childNodes
    childNodes
        .map(child => (isNode(child) ? child : document.createTextNode(child)))
        .forEach(child => {
            element.appendChild(child)
        })

    //事件接口
    element.pipeEvent = pipeEvent(element)
    element.subscribeEvent = subscribeEvent(element)

    return element
}
