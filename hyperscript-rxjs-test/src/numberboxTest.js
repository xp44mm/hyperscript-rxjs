import { BehaviorSubject } from 'rxjs'
import { numberbox } from 'hyperscript-rxjs'

export const numberboxTest = () => {
    // try {
        let number = new BehaviorSubject(0)
        number.subscribe(console.log)
        return numberbox({ number:number })

    // } catch (err) {
    //     console.log(err.message)
    // }
}

