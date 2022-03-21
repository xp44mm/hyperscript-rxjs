import { blockLevelFamily } from './blockLevelFamily'
import { inlineFamily } from './inlineFamily'

/// CSS的display显示时的取值
export function getDisplay(elem) {
    if (elem.tagName === 'TBODY') {
        return 'table-row-group'
    } else if (elem.tagName === 'THEAD') {
        return 'table-header-group'
    } else if (elem.tagName === 'TFOOT') {
        return 'table-footer-group'
    } else if (elem.tagName === 'TR') {
        return 'table-row'
    } else if (elem.tagName === 'TD' || elem.tagName === 'TH') {
        return 'table-cell'
    } else if (elem.tagName === 'COLGROUP') {
        return 'table-column-group'
    } else if (elem.tagName === 'COL') {
        return 'table-column'
    } else if (elem.tagName === 'CAPTION') {
        return 'table-caption'
    } else if (blockLevelFamily.has(elem.tagName)) {
        return 'block'
    } else if (inlineFamily.has(elem.tagName)) {
        return 'inline'
    } else {
        return 'unset'
    }
}
