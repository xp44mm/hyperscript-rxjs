import { isObservable } from 'rxjs'

export function textNode(text) {
    if (isObservable(text)) {
        let node = document.createTextNode("")
        text.subscribe({
            next: t => { node.nodeValue = t },
            error: err => { node.nodeValue = err.message }
        })
        return node
    } else {
        return document.createTextNode(text)
    }
}
