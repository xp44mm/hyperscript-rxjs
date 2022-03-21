import { b, p, table, tbody, td, th, thead, tr } from 'hyperscript-rxjs'

export function styleprop() {
    return table(
        thead(tr(
            th({ 'style.width': '10em' }, '名称'),
            th({ 'style.width': '20em' }, '备注'))),
        tbody(
            tr(th('五一'), td('三天假期')),
            tr(th('十一'), td('七天假期')))
    )
}

export function bc() {
    return p(
        {
            'style.backgroundColor': '#A5D6A7',
        },
        'test style prop'
    )
}
