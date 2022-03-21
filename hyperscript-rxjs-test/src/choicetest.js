import { button, choice, div, span, textbox, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export const choicetest = () => {
    let chosen = new BehaviorSubject('yin')

    let value = new BehaviorSubject('hello world!')

    let possibilities = {
        yin: div(
            textbox({ value }),
            button('go to').subscribeEvent('click', e => {
                chosen.next('yang')
            }),
        ),
        yang: div(
            span(textNode(value)),
            button('go to').subscribeEvent('click', e => {
                chosen.next('yin')
            }),
        ),
    }

    return choice(chosen, possibilities)

}
