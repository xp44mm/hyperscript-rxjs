import { from } from 'rxjs'

const computeFutureValue = new Promise((resolve, reject) => {
    setTimeout(() => {        //*1
        reject(new Error('Unexpected Exception!'));
        //resolve(42)
    }, 5000)
})

export function subscribeFuture() {
    from(computeFutureValue).subscribe({
        next: val => {
            console.log(val)
        },
        error: err => {
            console.log(`Error occurred: ${err}`)
        },
        complete: () => {
            console.log('All done!')
        },
    })
}
