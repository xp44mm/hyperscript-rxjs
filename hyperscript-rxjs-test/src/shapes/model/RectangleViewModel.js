import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export class RectangleViewModel {
    constructor() {
        this.width = new BehaviorSubject(0)
        this.height = new BehaviorSubject(0)

        this.area =
            combineLatest([this.width, this.height])
            |> map(([w, h]) => w * h)

        this.peri =
            combineLatest([this.width, this.height])
            |> map(([w, h]) => 2 * (w + h))

        this.dimension =
            combineLatest([this.width, this.height])
            |> map(([w, h]) => `${w}×${h}`)

    }

}
