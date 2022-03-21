import { BehaviorSubject } from 'rxjs'
import { tabControl } from 'hyperscript-rxjs'

export function tabControlTest() {
    ///選項卡面板標題
    const tabtags = ['Home', 'Profile', 'Contact']

    ///選項卡面板内容
    const sheets = [
        "Raw",
        "Food",
        "Messenger",
    ]

    let tabIndex = new BehaviorSubject(0)
    return tabControl({ tabIndex }, tabtags, sheets)
}

