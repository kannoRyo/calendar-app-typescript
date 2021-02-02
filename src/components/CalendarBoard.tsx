import React, { useEffect, useState } from 'react'
import {makeStyles} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {dayArray} from '../utils/Array'
import dayjs from 'dayjs'
import { getDayjs } from '../features/time/timeSlice'
import {renderCalendar} from '../utils/renderCalendar'
import {ScheduleCreateDialog} from './index'
import {ScheduleBar} from './UIKit/index'
import {fetchSchedulesAsync, getSchedules} from '../features/schedules/scheduleSlice'

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

    },
    dateNum:{
        marginBottom:'10px'
    }
})

const CalendarBoard = ()=>{
    const classes = useStyles()
    const selector = useSelector(state => state)
    const year = dayjs(getDayjs(selector)).year()
    const month = dayjs(getDayjs(selector)).month() 
    const dispatch = useDispatch()

    const [isCreate, setIscreate] = useState(false)
    const [selectedTime, setSelectedTime] = useState({})

    const calendar = renderCalendar(year, month)
    const schedules = getSchedules(selector)

    const handleIsCreate = () =>{
        setIscreate(!isCreate)
    }

    const hadnleSelectedTime = (year: number, month: number, date: number) =>{
        setSelectedTime({
            year: year,
            month: month,
            date: date
        })
    }
    
    useEffect( ()=>{
        dispatch(fetchSchedulesAsync(year, month))
    },[month])

    console.log(schedules)
    
	return (
    <>
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
                                weekDate.map((date:any , i:number)=>{
                                    const todaySchedules = schedules.filter((schedule:any)=> (date.isMonth === true && date.date === schedule.date) )
                                    return(
                                        <li 
                                            className={  date.isMonth ?  classes.dateIsMonthItem : classes.dateItem }  
                                            key={i.toString()}　
                                            onClick={()=>{
                                                hadnleSelectedTime(year, month, date.date)
                                                setIscreate(!isCreate)
                                            }}
                                        >
                                            <div className={classes.dateNum} > 
                                             {date.date}
                                            </div>
                                            {
                                                todaySchedules.map((schedule:any)=>(
                                                    <ScheduleBar schedule={schedule} handleIsCreate={()=>handleIsCreate()}　/> 
                                                ))     
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ))
                }
        </div>
        <ScheduleCreateDialog
            handleToggle={()=> handleIsCreate()}
            open={isCreate}
            time={selectedTime}
        />
    </>
)
}

export default CalendarBoard
