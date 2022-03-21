import { button, div, label, numberbox, option, select, td, textNode, tr } from 'hyperscript-rxjs'
import { map } from 'rxjs/operators'
import { ShapeViewModel } from '../model/ShapeViewModel'

let kinds = ['rectangle', 'circle']

export function shapeRow(item = new ShapeViewModel(), list) {
    let rectangle = item.rectangle
    let circle = item.circle

    return tr(
        td(select({ value: item.kind }, kinds.map(text => option({ text })))),
        td(
            div(
                {
                    'style.display': item.kind.pipe(
                        map(k => (k === 'rectangle' ? 'block' : 'none'))
                    ),
                },
                label('width', numberbox({ number: rectangle.width, size: 8 })),
                label(
                    'height',
                    numberbox({ number: rectangle.height, size: 8 })
                )
            ),
            div(
                {
                    'style.display': item.kind.pipe(
                        map(k => (k === 'circle' ? 'block' : 'none'))
                    ),
                },

                label(
                    'diameter',
                    numberbox({ number: circle.diameter, size: 8 })
                )
            )
        ),
        td(textNode(item.peri)),
        td(textNode(item.area)),
        td(
            button('移除').subscribeEvent('click', _ => {
                list.removeChild(item)
            })
        )
    )
}
