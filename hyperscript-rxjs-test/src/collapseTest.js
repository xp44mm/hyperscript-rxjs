import { checkbox, collapse, div, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export const collapseTest = () => {
    let hidden = new BehaviorSubject(false)
    hidden.subscribe(h => { console.log(h) })

    return div(
        textNode('collapse Test'),
        checkbox({ checked: hidden }),
        ...collapse(hidden, div('first'), div('second'))
    )
}