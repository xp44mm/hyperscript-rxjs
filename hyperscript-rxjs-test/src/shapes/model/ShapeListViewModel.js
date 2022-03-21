import { ObservableArray } from 'deep-rxjs'
import { ShapeViewModel } from './ShapeViewModel'

export class ShapeListViewModel {
    constructor() {
        this.shapes = new ObservableArray()
        this.shapes.appendChild = i => this.insertBefore(i)
    }

    push(i) {
        let shape = new ShapeViewModel()
        this.shapes.insertBefore(shape,i)
    }

    removeChild(shape) {
        let i = this.shapes.indexOf(shape)
        if (i > -1) {
            this.shapes.removeChild(i)
        }
    }
}
