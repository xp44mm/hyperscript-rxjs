import { ShapeViewModel } from './ShapeViewModel'

//充分綁定？
export function bindingShape(
    source = new ShapeViewModel(),
    target = new ShapeViewModel()
) {
    source.kind.subscribe(target.kind)
    source.rectangle.width.subscribe(target.rectangle.width)
    source.rectangle.height.subscribe(target.rectangle.height)
    source.circle.diameter.subscribe(target.circle.diameter)
}
