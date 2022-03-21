import { pickBehaviorSubject, restore } from 'deep-rxjs'
import { button, choice, div, option, select } from 'hyperscript-rxjs'
import { ShapeViewModel } from '../model'
import { circleInput } from './circleInput'
import { rectangleInput } from './rectangleInput'
import { result } from './result'

let data = { kind: 'rectangle',rectangle: { width: 10, height: 20 },  }
let kinds = ['rectangle', 'circle']

export function shapeInput(model = new ShapeViewModel()) {
    let options = kinds.map(text => option({ text }))

    return div(
        '形状',select({ value: model.kind }, options),
        ...choice(model.kind, {
            circle: circleInput(model.circle),
            rectangle: rectangleInput(model.rectangle),
        }),

        result(model),

        div(
            button('保存').subscribeEvent('click', e => {
                let data = pickBehaviorSubject(model)
                console.log(data)
            }),

            button({}, '重置').subscribeEvent('click', e => {
                restore(model, data)
            })
        )
    )
}
