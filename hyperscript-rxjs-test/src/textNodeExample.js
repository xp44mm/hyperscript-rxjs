import { p, textNode } from 'hyperscript-rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

export function textNodeExample() {
    const numbers = interval(1000)
    const texts = numbers.pipe(map(x => `Next: ${x}`))
    return p(textNode(texts))
}
