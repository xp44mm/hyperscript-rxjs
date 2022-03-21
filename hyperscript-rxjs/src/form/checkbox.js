import { map } from 'rxjs/operators'
import { input } from '../core'

export function checkbox(props) {
    let elem = input({ ...props, type: 'checkbox' })
    if (props.checked) {
        elem.pipeEvent('input', input$ =>
            input$.pipe(
                map(e => e.target.checked),
            ).subscribe(props.checked)
        )
    }

    return elem
}
