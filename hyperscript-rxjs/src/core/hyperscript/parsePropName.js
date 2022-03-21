/// 這裏的屬性都是dom api的屬性，不需要引號包裹，嵌套屬性用點號鏈接。
/// 如："style.color"
/// 返回的是葉節點屬性所在的對象，和屬性名，比如：[obj.style,"color"]
export function parsePropName(prop, obj) {
    if (prop.includes('.')) {
        let heading = prop.split('.')
        let last = heading.pop()
        let target = heading.reduce((obj, prop) => obj[prop], obj)
        return [target, last]
    } else {
        return [obj, prop]
    }
}
