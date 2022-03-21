import { p } from 'hyperscript-rxjs'
import '../css/classprop.css'

export function classprop() {
    return p({
        className: 'success',
        '.failed': false,
    }, 'test class prop')
}