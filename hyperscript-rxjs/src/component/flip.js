import { map } from 'rxjs/operators'
import { collapse } from './collapse'

/// 元素或元素数组
export function flip(hideYin, yin, yang) {
    let hideYang = hideYin |> map(v => !v)
    return [
        ...collapse(hideYang, yin),
        ...collapse(hideYin, yang)
    ]
}
