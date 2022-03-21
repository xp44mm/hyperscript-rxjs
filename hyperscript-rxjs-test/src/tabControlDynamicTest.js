import { ObservableArray } from 'deep-rxjs'
import { bindTabIndex, tabNavItem, tabPanel, tabRoot } from 'hyperscript-rxjs'
import { BehaviorSubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { sheets, tabtags } from './tabControlTest'

///動態選項卡示例
export function tabControlDynamicTest() {
    let root = tabRoot({}) // tabControl({ tabIndex }, tags, panels)
    let navs = root.firstChild
    let panels = root.lastChild

    //選項卡的按鈕，面板對
    let entries = new ObservableArray()

    //配置添加事件
    entries.insertBefore$
        |> map(([[tag, panel],i]) => [tabNavItem(tag), tabPanel(panel)])
        |> (o =>
            o.subscribe(([tag, panel]) => {
                navs.appendChild(tag)
                panels.appendChild(panel)
            }))

    //配置刪除事件
    entries.removeChild$
        |> tap(i => {
            let nav = navs.childNodes[i]
            nav.parentNode.removeChild(nav)

            let panel = panels.childNodes[i]
            panel.parentNode.removeChild(panel)
        })
        |> (o =>
            o.subscribe(i => {
                if (i === tabIndex.value) {
                    if (i > 0) {
                        tabIndex.next(i - 1)
                    } else {
                        tabIndex.next(0)
                    }
                }
            }))

    // 初始化選項卡控件
    for (let i of tabtags.keys()) {
        entries.insertBefore([tabtags[i], sheets[i]],i)
    }

    let tabIndex = new BehaviorSubject(0)
    bindTabIndex(root, tabIndex)

    tabIndex.next(2)

    //test removeChild event
    entries.removeChild(2)

    return root
}
