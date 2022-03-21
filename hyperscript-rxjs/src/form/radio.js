import { map } from 'rxjs/operators'
import { input } from '../core'

//单选按钮
export function radio(props) {
    let elem = input({ ...props, type: 'radio' })
    if (props.checked) {
        elem.pipeEvent('input', input$ =>
            input$.pipe(
                map(e => e.target.checked),
            ).subscribe(props.checked)
        )
    }
    return elem
}
