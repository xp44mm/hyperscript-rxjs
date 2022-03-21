import { hyperscriptArgs } from './hyperscriptArgs'

test('hyperscript args empty & single props', () => {
    expect(hyperscriptArgs([])).toEqual({
        props: {},
        childNodes: [],
    })


    expect(hyperscriptArgs([{}])).toEqual({
        props: {},
        childNodes: [],
    })

    expect(hyperscriptArgs([null])).toEqual({
        props: {},
        childNodes: [],
    })
    expect(hyperscriptArgs([undefined])).toEqual({
        props: {},
        childNodes: [],
    })
})

test('hyperscript args single childNodes', () => {
    expect(hyperscriptArgs([1])).toEqual({
        props: {},
        childNodes: [1],
    })

    expect(hyperscriptArgs([...[1]])).toEqual({
        props: {},
        childNodes: [1],
    })

    expect(hyperscriptArgs([1, 2])).toEqual({
        props: {},
        childNodes: [1, 2],
    })
})

test('hyperscript args props & childNodes', () => {
    expect(hyperscriptArgs([{ x: 1 }, 1])).toEqual({
        props: { x: 1 },
        childNodes: [1],
    })

    expect(hyperscriptArgs([{ x: 1 }, ...[1]])).toEqual({
        props: { x: 1 },
        childNodes: [1],
    })

    expect(hyperscriptArgs([{ x: 1 }, 1, 2])).toEqual({
        props: { x: 1 },
        childNodes: [1, 2],
    })
})
