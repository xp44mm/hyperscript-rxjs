import { map } from 'rxjs/operators'
import { input } from '../core'

export function textbox(props) {
    let elem = input({ ...props, type: 'text' })
    elem.pipeEvent(
        'input',
        input$ =>
            input$
            |> map(e => e.target.value)
            |> (o => o.subscribe(props.value))
    )
    return elem
}
