import { nestedMerge } from 'deep-rxjs'
import { button, div } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function nestedmergeTest() {
    const source = {
        a: {
            b: new BehaviorSubject(0),
            c: new BehaviorSubject(1),
        },
        x: [new BehaviorSubject(2), new BehaviorSubject(3)]
    }

    nestedMerge(source).subscribe(data => {
        console.log(data)
    })

    return div(
        button('next a b').subscribeEvent('click', e => {
            source.a.b.next(10)
        }),
        button('next a c').subscribeEvent('click', e => {
            source.a.c.next(11)
        }),
    )

}
