import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

export class CircleViewModel {
    constructor() {
        this.diameter = new BehaviorSubject(0)
        this.area = this.diameter |> map(d => Math.PI / 4 * d ** 2)
        this.peri = this.diameter |> map(d => Math.PI * d)
        this.dimension = this.diameter |> map(d => `φ${d}`)
    }
}
