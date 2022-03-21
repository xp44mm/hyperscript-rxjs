import { map } from 'rxjs/operators'
//import { textarea as createTextarea } from '../core/tags'
import { hyperscript } from '../core/hyperscript'

export function textarea(props) {
    //let elem = createTextarea(props)
    let elem = hyperscript('textarea', props)

    elem.pipeEvent(
        'input',
        input$ =>
            input$
            |> map(e => e.target.value)
            |> (o => o.subscribe(props.value))
    )

    return elem
}
