import { Observable } from 'rxjs'

const OFFSET = 3000
const SPEED = 50

const progressBar$ = new Observable(observer => {
    let val = 0
    function progress() {
        if (++val <= 100) {
            observer.next(val) //*1
            setTimeout(progress, SPEED) //*2
        } else {
            observer.complete() //*3
        }
    }
    setTimeout(progress, OFFSET) //*4
})

export function loadProgressBar() {
    const label = document.getElementById('root')
    progressBar$.subscribe({
        next: val => (label.textContent = Number.isInteger(val) ? val + '%' : val),
        error: error => console.log(error.message),
        complete: () => (label.textContent = 'Complete!'),
    })
}