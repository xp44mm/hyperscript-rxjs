import { deepCombineLatest, observableDeep } from 'deep-rxjs'
import { button, div } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

export function deepcombinelatestTest() {
    const source = {
        a: {
            b: new BehaviorSubject(0),
            c: new BehaviorSubject(1),
        },
        x: [new BehaviorSubject(2), new BehaviorSubject(3)]
    }

    let deep = observableDeep(source)

    deepCombineLatest(deep)
        |> map(deep => deep.entries)
        |> (obs => obs.subscribe(console.log))

    return div(
        button('next a b').subscribeEvent('click', e => {
            source.a.b.next(10)
        }),
        button('next x 1').subscribeEvent('click', e => {
            source.x[1].next(13)
        }),
    )

}
