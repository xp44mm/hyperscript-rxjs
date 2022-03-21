import { button, div, textbox, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function textboxTest() {
    let value = new BehaviorSubject('ddd')
    value.subscribe(console.log)

    let backgroundColor = new BehaviorSubject('red')

    return div(
        textbox({ value, 'style.backgroundColor': backgroundColor }),
        button('修改').subscribeEvent('click', e => {
            value.next('xxxx')
            backgroundColor.next('blue')
        }),
        textNode(value)
    )
}
