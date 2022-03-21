import { filter, map } from 'rxjs/operators'
import { button, div, li, ul } from '../core'

///選項卡按鈕
export function tabNavItem(...source) {
    return li({
        className: 'nav-item',
    },
        button(
            {
                type: 'button',
                className: 'btn btn-link nav-link',
            },
            ...source
        )
    )
}

///選項卡面板
export function tabPanel(...source) {
    return div({
        className: 'tab-pane',
    },
        ...source
    )
}

///選項卡框架
export function tabRoot(props = {}) {
    return div(
        props,
        ul({
            className: 'nav nav-tabs',
        }),
        div({
            className: 'tab-content',
        })
    )
}

export function bindTabIndex(tabRoot, tabIndex = new BehaviorSubject(0)) {
    let navs = tabRoot.firstChild
    let panels = tabRoot.lastChild

    //執行顯示與隱藏的動作
    tabIndex.subscribe(i => {
        Array.from(navs.childNodes).forEach((li, j) => {
            let btn = li.firstChild
            if (i === j) {
                btn.classList.add('active')
            } else {
                btn.classList.remove('active')
            }
        })

        Array.from(panels.childNodes).forEach((panel, j) => {
            if (i === j) {
                panel.classList.add('active')
            } else {
                panel.classList.remove('active')
            }
        })
    })

    //点击标签的切换事件
    navs.pipeEvent('click', click$ =>
        click$
        |> map(e =>
            [...navs.childNodes].map(e => e.firstChild).indexOf(e.target)
        )
        |> filter(i => i > -1)
        |> (o => o.subscribe(tabIndex))
    )

}

///靜態選項卡：選項卡不變的選項卡控件，選項卡不增，不減，不改變順序
export function tabControl(props, tabs, panels) {
    let { tabIndex, ...rootProps } = props

    let root = tabRoot(rootProps)
    let tablist = root.firstChild
    let tabcontent = root.lastChild

    tabs.map(tab => tabNavItem(tab)).forEach(item => tablist.appendChild(item))
    panels
        .map(panel => tabPanel(panel))
        .forEach(panel => tabcontent.appendChild(panel))

    //最後綁定
    bindTabIndex(root, tabIndex)
    return root
}
