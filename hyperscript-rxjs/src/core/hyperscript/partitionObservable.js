import { isObservable } from 'rxjs'

/// 将对象属性按类型分为兩部分：可观察与不可观察
export function partitionObservable(obj) {
    let observables = {}
    let scalars = {}
    for (const key in obj) {
        let value = obj[key]

        if (isObservable(value)) {
            observables[key] = value
        } else {
            scalars[key] = value
        }
    }
    return [observables, scalars]
}
