import { div, numberbox } from 'hyperscript-rxjs'
import { CircleViewModel } from '../model'

export function circleInput(model = new CircleViewModel()) {
    return div('直径', numberbox({ number: model.diameter }))
}

