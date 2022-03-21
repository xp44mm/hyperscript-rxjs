import { ObservableArray } from 'deep-rxjs'
import { button, div, li, textbox, ul } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

export function simplelist() {
    let items = new ObservableArray()
    items.insertBefore$.subscribe(([item, i]) => {
        let parent = root.getElementsByTagName('ul')[0]
        parent.insertBefore(li(item), null)
    })

    let value = new BehaviorSubject('')

    let root = div(
        'new item',
        textbox({ value }),
        button({
            disabled: value |> map(value => value === '')
        }, 'Add')
            .subscribeEvent('click', e => {
                items.insertBefore(value.value)
                value.next('')
            }),
        ul()
    )

    items.insertBefore('Alpha')
    items.insertBefore('Beta')
    items.insertBefore('Gamma')

    return root
}
