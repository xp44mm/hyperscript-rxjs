import { ObservableArray } from 'deep-rxjs'
import { CircleViewModel } from './CircleViewModel'

export class CircleListViewModel {
    constructor() {
        this.circles = new ObservableArray()
        this.circles.appendChild = i => this.circles.insertBefore(new CircleViewModel(), i)
    }
}
