import { option, select, span, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'

export function forms() {
    return selectforms()
}

//export function forms() {
//    let a = new BehaviorSubject(false)
//    let b = new BehaviorSubject(false)
//    let c = new BehaviorSubject(false)

//    return [
//        hyperscript('select', {
//            multiple: true, style: "width: 50px;", // value
//        }, [
//            option({ selected: a }, "A"),
//            option({ selected: b }, "B"),
//            option({ selected: c }, "C"),
//        ]).subscribeEvent('input', e => {
//            let ss = e.target
//            let aa = ss[0].selected
//            let bb = ss[1].selected
//            let cc = ss[2].selected

//            if (a.value !== aa) a.next(aa)
//            if (b.value !== bb) b.next(bb)
//            if (c.value !== cc) c.next(cc)
//        }),
//        div(
//            span("Selected: "),
//            textNode(a),
//            textNode(b),
//            textNode(c),
//        )
//    ]
//}



function selectforms() {
    let selectedIndex = new BehaviorSubject(0)

    return [
        select({
            selectedIndex
        }, [
            option({ disabled: true, value: "", }, "please select"),
            option("A"),
            option("B"),
            option("C"),
        ]),
        span("Selected: "), textNode(selectedIndex)
    ]
}


//export function radioforms() {

//    let one = new BehaviorSubject(true)
//    let two = new BehaviorSubject(false)

//    let picked =
//        merge(
//            one |> map(x => [x, 'One']),
//            two |> map(x => [x, 'Two']),
//        )
//        |> filter(([ck]) => ck)
//        |> map(([ck, name]) => name)

//    return div({
//        id: "example-4",
//    }, [
//        radio({ id: "one", value: "One", checked: one, name: "drone" }),
//        label({ htmlFor: "one", }, "One"),
//        br(),
//        radio({ id: "two", value: "Two", checked: two, name: "drone" }),
//        label({ htmlFor: "two", }, "Two"),
//        br(),
//        span("Picked: "), textNode(picked)
//    ])
//}


//export function checkboxarrayforms() {
//    let checkedNames = []

//    let jack = new BehaviorSubject(false)
//    let john = new BehaviorSubject(false)
//    let mike = new BehaviorSubject(false)

//    let result =
//        merge(
//            jack |> map(x => [x, 'Jack']),
//            john |> map(x => [x, 'John']),
//            mike |> map(x => [x, 'Mike']),
//        )
//        |> tap(([ck, name]) => {
//            if (ck) {
//                checkedNames.push(name)
//            } else {
//                let i = checkedNames.findIndex(nm => nm === name)
//                checkedNames.splice(i, 1)
//            }
//        })

//    return [
//        checkbox({
//            id: "jack",
//            value: "Jack",
//            checked: jack,
//        }),
//        label({
//            htmlFor: "jack",
//        }, "Jack"),
//        checkbox({
//            id: "john",
//            value: "John",
//            checked: john,
//        }),
//        label({
//            htmlFor: "john",
//        }, "John"),
//        checkbox({
//            id: "mike",
//            value: "Mike",
//            checked: mike,
//        }),
//        label({
//            htmlFor: "mike",
//        }, "Mike"),

//        br(),

//        div(
//            "Checked names: ",
//            textNode(
//                result
//                |> mergeMap(() => of(checkedNames.join(',')))
//            ),

//        )
//    ]
//}
//export function checkboxboolforms() {
//    let checked = new BehaviorSubject(true)
//    checked.subscribe(console.log)

//    return [
//        checkbox({
//            id: "checkbox",
//            checked,
//        }),
//        label({
//            htmlFor: "checkbox",
//        }, textNode(checked)),
//    ]
//}



//export function textareaForms() {
//    let message = new BehaviorSubject('')
//    message.subscribe(console.log)

//    return [
//        span("Multiline message is:"),
//        p({
//            'style.whiteSpace': "pre-line",
//        }, textNode(message)),
//        br(),
//        textarea({
//            value: message,
//            placeholder: "add multiple lines",
//        }),
//    ]
//}

//export function textboxForms() {
//    let message = new BehaviorSubject('')
//    message.subscribe(console.log)

//    return div(
//        textbox({ value: message, placeholder: 'edit me' }),
//        div('Message is: ', textNode(message))
//    )
//}

