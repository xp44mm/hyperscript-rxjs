import { ObservableArray } from 'deep-rxjs'
import { a, button, div, li, textbox, ul, h2, span, textNode } from 'hyperscript-rxjs'
import { BehaviorSubject,of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

class Person {
    constructor() {
        this.name = new BehaviorSubject('new Person')
        this.children = new ObservableArray()
    }
}

class ViewModel {
    constructor() {
        this.people = new ObservableArray()
    }
}

function personView(person = new Person()) {
    let root = li(
        div(
            span(textNode(person.name)),
            textNode(" has "),
            span(textNode(person.children.insertBefore$ |> mergeMap(() => of(person.children.length)))),
            textNode(" children: "),
            a({ href: "#", }, "Add child").subscribeEvent('click', e => {
                person.children.insertBefore("New child")
            }),
        ),
        ul(),
    )

    let container = root.getElementsByTagName('ul')[0]

    person.children.insertBefore$.subscribe(([name]) => {
        container.insertBefore(li(name), null)
    })

    return root
}

export function mvvm(vm = new ViewModel()) {
    let root = div(
        h2("People"),
        button('add person').subscribeEvent('click', e => {
            vm.people.insertBefore(new Person())
        }),
        ul(),
    )

    let container = root.getElementsByTagName('ul')[0]

    vm.people.insertBefore$.subscribe(([person]) => {
        container.insertBefore(personView(person), null)
    })

    let slave = name => li(name)
    return root
}