import dayjs from 'dayjs'

const renderPreviousCalendar = (y:number,m:number) =>{
    const previousArray = []
    const d = new Date(y,m)
    const day = dayjs(d).day()
    let date = dayjs(d).date(0).date()

    for(let i = 1 ; i <= day ;i++){
        previousArray.unshift(date)
        date--
    }
    return previousArray
}

const renderNextCalendar = (y:number ,m:number ) =>{
    const NextArray = []
    const d = new Date(y,m+1)
    let day = dayjs(d).day()

    for(let i = 1 ; day <= 6 ;i++){
        NextArray.push(i)
        day++
    }    

    return NextArray
}

const rendercCurrentCalendar = (y:number,m:number) =>{
    const CurentArray = []
    const d = new Date(y,m+1)
    let date = dayjs(d).date(0).date()

    for(let i=1; i <= date ; i++){
        CurentArray.push(i)
    }

    return CurentArray
}

export const renderCalendar = (y:number,m:number) => {
    const p = renderPreviousCalendar(y,m)
    const c = renderNextCalendar(y,m)
    const n = rendercCurrentCalendar(y,m)

    const calendar = p.concat(c).concat(n)
    console.log(calendar)
}