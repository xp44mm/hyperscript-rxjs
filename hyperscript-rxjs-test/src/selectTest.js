import { BehaviorSubject, fromEvent } from 'rxjs'
import { map, mapTo } from 'rxjs/operators'
import { button, div, option, select, textNode, h3 } from 'hyperscript-rxjs'


function selectedIndexTest() {
    const arr = ['零', '壹', '贰']

    let selectedIndex = new BehaviorSubject(1)

    let options = arr.map(text => option({ text }))
    let selectElem = select({ selectedIndex }, options)

    selectedIndex.subscribe(i => {
        console.log(`${i},${selectElem.value}`)
    })

    let btn = button({ disabled: selectedIndex |> map(i => i === 0) }, '重置')

    let reset$ = fromEvent(btn, 'click') |> mapTo(0)

    reset$.subscribe(selectedIndex)

    let value$ = selectedIndex.pipe(map(i => selectElem.options[i].value))

    return div(
        h3('selectedIndexTest'),

        selectElem,
        btn,
        div(textNode(selectedIndex)),
        div(textNode(value$))
    )
}

function valueTest() {
    const arr = ['零', '壹', '贰']

    let value = new BehaviorSubject('壹')

    let options = arr.map(text => option({ text }))
    let selectElem = select({ value }, options)

    value.subscribe(v => {
        console.log(`${v},${selectElem.selectedIndex}`)
    })

    return div(
        h3('valueTest'),
        selectElem,
        button({ disabled: value |> map(i => i === arr[0]) }, '重置')
            .subscribeEvent('click', e => {
                value.next(arr[0])
            }),
        div('value:', textNode(value)),
        //div('selectedIndex:', textNode(value |> map(i => selectElem.options[i].value)))
    )
}

function simpleSelectTest() {

    let selectElem = select({ value: '壹' }, ['零', '壹', '贰'].map(text => option({ text })))
    let output = textNode('')

    return div(
        selectElem,
        button('测试')
            .subscribeEvent('click', e => {
                output.nodeValue = selectElem.value
            }),
        div('value:', output),

    )
}


export function selectTest() {
    return div(
        //selectedIndexTest(),
        valueTest()
    )
}
