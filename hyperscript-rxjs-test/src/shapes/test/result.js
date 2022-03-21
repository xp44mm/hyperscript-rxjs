import { div, textNode } from 'hyperscript-rxjs'

export function result(model) {
    return div(
        div('周长:', textNode(model.peri)),
        div('面积:', textNode(model.area)),
    )
}
