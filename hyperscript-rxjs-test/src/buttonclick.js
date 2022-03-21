import { button, div, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

export function buttonclick() {
    let intro = new BehaviorSubject('introduce')

    return div(
        div(textNode(intro)),
        button('modify').subscribeEvent('click', e => {
            intro.next('modify')
        }),
        button('save').pipeEvent('click', click$ =>
            click$
            |> withLatestFrom(intro)
            |> map(([_, data]) => data)
            |> (o => o.subscribe(data => {
                console.log(data)
            }))
        )
    )
}