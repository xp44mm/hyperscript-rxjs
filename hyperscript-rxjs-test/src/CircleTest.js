import { BehaviorSubject, fromEvent } from 'rxjs'
import { map, sample, tap, withLatestFrom } from 'rxjs/operators'
import { button, div, textNode, numberbox } from 'hyperscript-rxjs'

//用事件限制反向更新变量
export function CircleTest() {
    let d = new BehaviorSubject(0)
    let r = new BehaviorSubject(0)

    let root = div(
        div(numberbox({ number: d })),
        div(numberbox({ number: r })),
    )

    d.pipe(map(d => d / 2)).subscribe(r)

    r |> sample(fromEvent(root.getElementsByTagName("input")[1], 'blur'))
        |> map(r => 2 * r)
        |> (o => o.subscribe(d))

    return root
}

//用两个主变，反向更新。
export function CircleBackTest() {
    let d = new BehaviorSubject(0)
    let r = d.pipe(map(d => d / 2))

    let r_write = new BehaviorSubject(0)

    let editRadius = new BehaviorSubject(false)

    let root = div(
        div(
            {
                'style.display':
                    editRadius |> map(edit => (edit ? 'none' : 'block')),
            },
            numberbox({ number: d })
        ),

        div(
            {
                'style.display':
                    editRadius |> map(edit => (!edit ? 'none' : 'block')),
            },
            textNode(d)
        ),

        div(
            {
                'style.display':
                    editRadius |> map(edit => (edit ? 'none' : 'block')),
            },
            textNode(r),

            button('编辑').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(r)
                    |> map(([_, r]) => r)
                    |> tap(x => {
                        editRadius.next(true)
                    })
                    |> (o => o.subscribe(r_write))
            )
        ),

        div(
            {
                'style.display':
                    editRadius |> map(edit => (!edit ? 'none' : 'block')),
            },

            numberbox({ number: r_write }),

            button('設定').pipeEvent(
                'click',
                click$ =>
                    click$
                    |> withLatestFrom(r_write)
                    |> map(([_, r]) => r * 2)
                    |> tap(() => {
                        editRadius.next(false)
                    })
                    |> (o => o.subscribe(d))
            ),

            button('取消').subscribeEvent('click', _ => {
                editRadius.next(false)
            })
        )
    )

    return root
}
