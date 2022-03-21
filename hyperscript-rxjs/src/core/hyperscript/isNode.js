export const isNode = obj =>
    obj &&
    obj.nodeType &&
    (obj.nodeType === document.ELEMENT_NODE || obj.nodeType === document.TEXT_NODE)
