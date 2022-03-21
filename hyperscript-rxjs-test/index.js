import { fragment } from 'hyperscript-rxjs'
//import { elem } from './src'

import './index.css'

import { numberboxTest } from './src/numberboxTest'
const elem = numberboxTest()

document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('root')
    let element = elem instanceof Array ? fragment(...elem) : elem
    root.appendChild(element)
})
