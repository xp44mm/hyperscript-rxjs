import { ShapeListViewModel } from './ShapeListModel';
import { shapeRow } from './shapeRow';

export function shapeRows(model = new ShapeListViewModel()) {
    let initRows = model.shapes.map(shape => shapeRow(shape))
    return initRows
}