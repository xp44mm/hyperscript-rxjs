import { p, textNode } from 'hyperscript-rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import '../css/classprop.css';

export function observableprop2() {
    const numbers = interval(1000)
    let elem = p({
        className: numbers |> map(n => n % 2 === 1 ? 'success' : 'failed')
    }, textNode('observable prop'))

    elem.className = 'success'

    return elem
}

export function observableprop3() {
    const numbers = interval(1000)
    let elem = p({
        className: 'success',
        '.failed': numbers |> map(n => n % 2 === 1)
    }, textNode('observable prop'))
    return elem
}

export function observableprop1() {
    const numbers = interval(1000)
    let elem = p({
        className: 'success',
        'style.backgroundColor': numbers |> map(n => n % 2 === 1 ? '#A5D6A7' : '#EF9A9A')
    }, textNode('observable prop'))
    return elem
}
