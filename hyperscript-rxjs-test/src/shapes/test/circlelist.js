import { pickBehaviorSubject, restore } from 'deep-rxjs'
import { button, div, li, numberbox, textNode, ul } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { CircleViewModel } from '../model'
import { CircleListViewModel } from '../model/CircleListViewModel'

export function circlelist(model = new CircleListViewModel()) {

    model.circles.insertBefore$.subscribe(([item, i]) => {
        let parent = root.getElementsByTagName('ul')[0]
        parent.insertBefore(li(textNode(item.diameter)), null)
    })

    let number = new BehaviorSubject(0)

    let root = div(
        'new circle',
        numberbox({ number }),
        button({
            disabled: number |> map(n => n <= 0)
        }, 'Add')
            .subscribeEvent('click', e => {
                let circle = new CircleViewModel()
                circle.diameter.next(number.value)
                model.circles.insertBefore(circle)
                number.next(0)
            }),
        ul(),
        div(
            button('save').subscribeEvent('click', e => {
                let data = pickBehaviorSubject(model)
                console.log(data)
            }),

            button({}, 'restore').subscribeEvent('click', e => {
                let data = { circles: [{ diameter: 7 }, { diameter: 8 }, { diameter: 9 }] }
                restore(model, data)
            })
        )
    )

    return root
}
