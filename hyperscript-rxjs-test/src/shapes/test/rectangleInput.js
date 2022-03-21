import { div, numberbox } from 'hyperscript-rxjs'
import { RectangleViewModel } from '../model'

export function rectangleInput(model = new RectangleViewModel()) {
    return div(
        '宽', numberbox({ number: model.width }), 
        '高', numberbox({ number: model.height })
        )
}

