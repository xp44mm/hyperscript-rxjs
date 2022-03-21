import { button, div, flip, span, textbox, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export const fliptest = () => {
    let hideYin = new BehaviorSubject(true)

    let value = new BehaviorSubject('hello world!')
    return div(
        button('flip').subscribeEvent('click', e => {
            hideYin.next(!hideYin.value)
        }),
        ...flip(hideYin,
            textbox({ value }),
            span(textNode(value))
        )
    )
}
