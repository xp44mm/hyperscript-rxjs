import { subscribeProp } from '../core/hyperscript/setProps'

///显示或隐藏包含的元素
///elements必须是元素节点，因为要附着属性，所以不能是textNode。
export function collapse(hidden, ...elements) {
    //支持子元素包含在数组中:fn([a,b,c]), fn(a,b,c)
    elements =
        elements.length === 1 && Array.isArray(elements[0])
            ? elements[0]
            : elements

    elements.forEach(elem => {
        subscribeProp(elem, 'hidden', hidden)
    })

    return elements
}
