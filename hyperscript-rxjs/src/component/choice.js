import { map } from 'rxjs/operators'
import { collapse } from './collapse'

///每个可能性可以是元素，也可以是元素数组，最后返回元素数组
export function choice(chosen, possibilities) {
    let elems = Object.entries(possibilities)
        .map(([k, possibility]) =>
            collapse(chosen |> map(name => name !== k), possibility)
        )
        .reduce((acc, cur) => [...acc, ...cur], [])

    return elems
}
