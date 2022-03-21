import { BehaviorSubject } from 'rxjs'
import { button, div, textarea, textNode } from 'hyperscript-rxjs'

export const textareaTest = () => {
    let value = new BehaviorSubject('ddd')
    value.subscribe(console.log)
    return div(
        textarea({ value }),
        button('修改').subscribeEvent('click', e => {
            value.next('xxxx')
        }),
        textNode(value)
    )
}
