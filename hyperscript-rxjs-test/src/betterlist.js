import { ObservableArray } from 'deep-rxjs'
import { button, div, li, textbox, ul } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

export function betterlist() {
    let value = new BehaviorSubject('')
    let root = div(
        'new item:', textbox({ value }),
        ul()
    )

    function ith(e) {
        let child = e.target.parentNode
        let parent = child.parentNode
        return [...parent.childNodes].indexOf(child)
    }

    function line(item) {
        return li(item,
            button({
                disabled: value |> map(value => value === '')
            }, 'insertBefore').pipeEvent('click',
                click$ => click$
                    |> map(e => ith(e))
                    |> withLatestFrom(value)
                    |> (o => o.subscribe(([i, v]) => {
                        items.insertBefore(v, i)
                        value.next('')
                    }))
            ),
            button({
                disabled: value |> map(value => value === '')
            }, 'replaceChild').pipeEvent('click',
                click$ => click$
                    |> map(e => ith(e))
                    |> withLatestFrom(value)
                    |> (o => o.subscribe(([i, v]) => {
                        items.replaceChild(v, i)
                        value.next('')
                    }))
            ),
            button('removeChild').subscribeEvent('click', e => {
                let i = items.indexOf(item)
                items.removeChild(i)
            }),
        )
    }

    let items = new ObservableArray()

    items.insertBefore$.subscribe(([item, i]) => {
        let parent = root.getElementsByTagName('ul')[0]
        let referenceNode = parent.childNodes[i]
        parent.insertBefore(line(item), referenceNode)
    })

    items.removeChild$.subscribe(i => {
        let parent = root.getElementsByTagName('ul')[0]
        let child = parent.childNodes[i]
        parent.removeChild(child)
    })

    items.replaceChild$.subscribe(([item, i]) => {
        let parent = root.getElementsByTagName('ul')[0]
        let textNode = parent.childNodes[i].childNodes[0]
        textNode.nodeValue = item
    })


    items.insertBefore('Alpha')
    items.insertBefore('Beta')
    items.insertBefore('Gamma')

    return root
}
