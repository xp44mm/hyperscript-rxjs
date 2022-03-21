import { div, p } from 'hyperscript-rxjs'
import { hyperscript } from 'hyperscript-rxjs'

export const elem =
    hyperscript('div', [
        hyperscript('a', { href: 'https://npm.im/hyperscript' }, 'hyperscript'),
        hyperscript('p', 'hyperscript'),
        hyperscript('div', hyperscript('p', 'hyperscript')),
        hyperscript('p', { 'style.backgroundColor': 'red' }, 'some text'),
    ])

let obj = {
    a: 'Apple',
    b: 'Banana',
    c: 'Cherry',
    d: 'Durian',
    e: 'Elder Berry'
}

//const h = hyperscript

//export const elem = h('table', [
//    h('tr', h('th', 'letter'), h('th', 'fruit')),
//    ...Object.keys(obj).map(function (k) {
//        return h('tr',
//            h('th', k),
//            h('td', obj[k])
//        )
//    })
//])