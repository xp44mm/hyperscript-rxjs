import { BehaviorSubject, fromEvent, merge } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import { button, div, input, label, p, textNode } from 'hyperscript-rxjs'

//單選按鈕實現字符數組中n選一
export const radioTest = () => {
    let name = 'drone'
    let values = ['huey', 'dewey', 'louie']

    //values數組中那個值被選中，當前值
    let current = new BehaviorSubject(values[0])
    current.subscribe(console.log)
    let labels = values.map(value =>
        div([
            label(
                input({
                    type: 'radio',
                    name,
                    value,
                    checked: current.pipe(map(cur => cur === value)),
                }),
                textNode(value)
            ),
        ])
    )

    let btn = button(
        { disabled: current |> map(value => value === values[0]) },
        '重置'
    )
    let root = div(p(textNode('Select a maintenance drone:'), btn), ...labels)

    let reset$ = fromEvent(btn, 'click') |> map(_ => values[0])

    let select$ =
        fromEvent(root, 'click')
        |> map(e => e.target)
        |> filter(elem => elem.tagName === 'INPUT')
        |> map(e => e.value)

    merge(reset$, select$).subscribe(current)

    return root
}
