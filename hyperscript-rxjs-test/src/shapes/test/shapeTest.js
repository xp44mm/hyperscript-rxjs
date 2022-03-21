import { pickBehaviorSubject, restore } from 'deep-rxjs'
import { button, choice, div, numberbox, option, select, textNode } from 'hyperscript-rxjs'
import { CircleViewModel, RectangleViewModel, ShapeViewModel } from '../model'

const circle = (model = new CircleViewModel()) =>
    div(numberbox({ number: model.diameter }), div(textNode(model.peri)), div(textNode(model.area)))

const rectangle = (model = new RectangleViewModel()) =>
    div(numberbox({ number: model.width }), numberbox({ number: model.height }), div(textNode(model.peri)), div(textNode(model.area)))

let kinds = ['rectangle', 'circle']

export function shapeTest() {
    let model = new ShapeViewModel()
    let options = kinds.map(text => option({ text }))
    let resetData = { rectangle: { width: 10, height: 20 }, kind: 'rectangle' }

    return div(
        select({ value: model.kind }, options),
        ...choice(model.kind, {
            circle: circle(model.circle),
            rectangle: rectangle(model.rectangle),
        }),

        div('周长:',textNode(model.peri)),
        div('面积:',textNode(model.area)),
        div(
            button('保存').subscribeEvent('click', _ => {
                let data = pickBehaviorSubject(model)
                console.log(data)
            }),

            button({}, '重置').subscribeEvent('click', _ => {
                restore(model, resetData)
            })
        )
    )
}
