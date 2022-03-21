import { div } from 'hyperscript-rxjs'
import { RectangleViewModel } from '../model/RectangleViewModel'
import { rectangleInput } from './rectangleInput'
import { result } from './result'

export function rectangleView() {
    let model = new RectangleViewModel() //视图模型保持默认构造函数，不能有参数
    return div(rectangleInput(model), result(model))
}