import { isObservable } from 'rxjs'
import { map } from 'rxjs/operators'
import { hyperscript } from '../core/hyperscript'

//代码演示：当选择值与选项都不匹配时，显示空白
//代码演示：option可以不显示：display:none，但是不显示的选项仍然是可选的，可以在后台设置。
export function select(props, ...options) {
    let elem = hyperscript('select', props, ...options)

    let { selectedIndex, value, ...rest } = props
    //
    if (isObservable(selectedIndex)) {

        selectedIndex.subscribe(i => {
            elem[i].selected = true
        })

        elem.pipeEvent('input', input$ =>
            input$.pipe(
                map(e => e.target.selectedIndex)
            ).subscribe(selectedIndex)
        )
    }

    //
    if (isObservable(value)) {

        value.subscribe(value => {
            Array.from(elem.getElementsByTagName('option'))
                .filter(opt => opt.value === value)
                .forEach(opt => { opt.selected = true })
        })

        elem.pipeEvent('input', input$ =>
            input$.pipe(
                map(e => e.target.value)
            ).subscribe(value)
        )
    }

    return elem
}
