import { BehaviorSubject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'
import { button, checkbox, div, textNode } from 'hyperscript-rxjs'

export const checkboxTest = () => {
    let checked = new BehaviorSubject(false)

    //輸出控制臺，觀察後端主題的狀態
    checked.subscribe(checked => {
        console.log(checked)
    })

    return div(
        textNode('checkboxTest'),
        checkbox({ checked }),
        button('反转').pipeEvent(
            'click',
            event =>
                event
                |> withLatestFrom(checked)
                |> map(([_,ck]) => !ck)
                |> (o => o.subscribe(checked))
        ),

        textNode(checked)
    )
}
