import { startWith } from 'rxjs/operators'
import { modifySubscription } from './modifySubscription'
import { parsePropName } from './parsePropName'
import { partitionObservable } from './partitionObservable'

///用普通变量值设置属性
export function setProp(element, key, value) {
    if (key.charAt(0) === '.') {
        //css查询类的语法，点号加一个类名
        let className = key.substring(1)

        if (value) {
            element.classList.add(className)
        } else {
            element.classList.remove(className)
        }
    } else {
        let [target, prop] = parsePropName(key, element)
        target[prop] = value
    }
    return element // fluent api
}

/// 訂閲單個屬性
export function subscribeProp(element, key, value$) {
    let subscription = value$
        |> startWith(0)
        |> (o => o.subscribe({
            next: value => {
                setProp(element, key, value)
            },
            error(e) { setProp(element, key, e.message) }
        }))

    modifySubscription(element, subscription)
    return element // fluent api
}

/// 設置元素的屬性：包括屬性常量。
export function setProps(element, props) {
    let [observables, scalars] = partitionObservable(props)

    // set props
    Object.entries(scalars).forEach(([key, value]) => {
        setProp(element, key, value)
    })

    //注意顺序，订阅要在设置常量以后

    // observalbe subscribe
    Object.entries(observables).forEach(([prop, value$]) => {
        subscribeProp(element, prop, value$)
    })

    return element // fluent api
}
