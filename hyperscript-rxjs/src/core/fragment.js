/// 用途：插入一组元素，不必使用循环语句，fragment用后即弃。
export function fragment(...childNodes) {
    childNodes = childNodes.length === 1 && Array.isArray(childNodes[0]) ? childNodes[0] : childNodes

    let frag = new DocumentFragment()

    childNodes.forEach(elem => {
        frag.appendChild(elem)
    })
    return frag
}
