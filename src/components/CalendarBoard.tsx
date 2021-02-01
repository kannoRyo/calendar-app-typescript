import React from 'react'
import {makeStyles} from '@material-ui/core'
import { useSelector } from 'react-redux'
import {dayArray} from '../utils/Array'
import dayjs from 'dayjs'
import { getDayjs } from '../features/time/timeSlice'
import {renderCalendar} from '../utils/renderCalendar'
import { rootReducer } from '../features/store/store'

const useStyles = makeStyles({
    board:{
        height: '92vh',
        borderTop: '1px solid #ccc ',
        borderLeft: '1px solid #ccc'
    },
    dayList:{
        display: 'flex',
        textAlign: 'center',
        fontSize:'0.75rem'
    },
    dateList:{
        display: 'flex',
        textAlign: 'center',
        fontSize:'0.75rem',
        width: '100%',
    },
    dayItem:{
        listStyle: 'none',
        width:'14.2%',
        color:'rgba(0, 0, 0, 0.54)',
        height: '20px',
        paddingTop: '10px',
        borderRight: '1px solid #ccc',
    },
    dateItem:{
        listStyle: 'none',
        width:'14.2%',
        color:'rgba(0, 0, 0, 0.40)',
        height: '135px',
        paddingTop: '10px',
        borderRight: '1px solid #ccc',
        borderBottom: '1px solid #ccc',

    },
    dateIsMonthItem:{
        listStyle: 'none',
        width:'14.2%',
        color:'black',
        height: '135px',
        paddingTop: '10px',
        borderRight: '1px solid #ccc',
        borderBottom: '1px solid #ccc',

    }
})

const CalendarBoard = ()=>{
    const classes = useStyles()
    const selector = useSelector(state => state)
    const year = dayjs(getDayjs(selector)).year()
    const month = dayjs(getDayjs(selector)).month() 
    const row = [1,2,3,4,5]

    const calendar = renderCalendar(year, month)

    console.log(calendar)

	return (
	<div className={classes.board} >
        <ul className={classes.dayList} >
            {
                dayArray.map((day: string,i: number) =>(
                    <li key={i.toString()} className={classes.dayItem} >{day}</li>
                ))
            }
        </ul>
            {
                calendar.map((weekDate: number[], i: number)=>(
                    <ul className={classes.dateList} >
                        {
                            weekDate.map((date:any , i:number)=>(
                              <li className={  date.isMonth ?  classes.dateIsMonthItem : classes.dateItem }  key={i.toString()}  >{date.date}</li>
                            ))
                        }
                    </ul>
                ))
            }
    </div>
)
}

export default CalendarBoard
