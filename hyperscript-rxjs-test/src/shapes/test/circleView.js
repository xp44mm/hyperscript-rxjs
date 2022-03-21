import { div } from 'hyperscript-rxjs'
import { CircleViewModel } from '../model/CircleViewModel'
import { circleInput } from './circleInput'
import { result } from './result'

export function circleView() {
    let model = new CircleViewModel() //视图模型保持默认构造函数，不能有参数
    return div(circleInput(model), result(model))
}