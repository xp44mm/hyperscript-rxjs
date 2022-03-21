import { fromEvent } from 'rxjs'

//启动代码：下面两句的起点代码是等价的
function DOMContentLoaded() {
    //dom方法
    document.addEventListener('DOMContentLoaded', () => {
    })
    //rxjs方法
    fromEvent(document, 'DOMContentLoaded').subscribe(() => {
    })
}


function specificationPipeEvent() {
    return button('設定').pipeEvent('click', click$ =>
        click$
        |> withLatestFrom(pumpFlow_write, absorber.nozzleNumber)
        |> map(([_, flow, nozzleNumber]) => flow / nozzleNumber)
        |> tap(() => {
            editMode.next('nozzleFlow')
        })
        |> (o => o.subscribe(absorber.nozzleFlow))
    )
}

function specificationSubscribeEvent() {
    let handler = e => {
        editMode.next('nozzleFlow')
    }

    button('取消').subscribeEvent('click', handler)

    //等价于
    button('取消').pipeEvent('click', click$ =>
        click$.pipe(/*空的*/).subscribe(handler)
    )

}