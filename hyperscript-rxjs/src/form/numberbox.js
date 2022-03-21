import { BehaviorSubject, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { input } from '../core'
import { subscribeProp } from '../core/hyperscript/setProps'

export function numberbox(props = {}) {
    let { number, ...rest } = props
    let elem = input({ ...rest, type: 'text' })

    if (number && number instanceof BehaviorSubject) {
        let value = number.pipe(map(n => String(n)))

        subscribeProp(elem, 'value', value)

        elem.pipeEvent('blur', blur$ =>
            blur$.pipe(
                map(e => Number(e.target.value))
            ).subscribe(newValue => {
                if (Number.isNaN(newValue)) {
                    elem.select()
                } else if (number.value !== newValue) {
                    number.next(newValue)
                }
            })
        )

    } else {
        console.log(number)
        console.log(BehaviorSubject)
        console.log(number.constructor)
        console.log(number.constructor === BehaviorSubject)


        throw new Error('numberbox must have `number` prop.')
    }

    //数字右对齐，用style可以获得最高优先级
    elem.style.textAlign = 'right'

    return elem
}
