import React from 'react'
import {Button, makeStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import EventIcon from '@material-ui/icons/Event';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import {nextMonth, getYear, previousMonth} from '../features/time/timeSlice'
import dayjs from 'dayjs';

const useStyles = makeStyles({
    header:{
        height: '8vh',
        display: 'flex',
        fontFamily: 'Noto Sans JP',
        color: '#737373',
    },
    icon:{
        height:'35px',
        width:'35px',
        margin: '16px 5px 16px 0',
        cursor:'pointer'
    },
    title:{
        fontWeight: 'normal',
        fontSize:'28px',
        margin: '0 15px 0 10px',
        lineHeight: '67px'
    },
    headerTitle:{
        fontSize: '20px',
        marginLeft: '25px'
    }
})

const Header = ()=>{
    const classes = useStyles()
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(selector)
    const year = dayjs(getYear(selector)).year()
    const month = dayjs(getYear(selector)).month() + 1

	return (
        <div className={classes.header} >
            <MenuIcon className={classes.icon} />
            <EventIcon className={classes.icon} color="primary" />
            <h1 className={classes.title} >カレンダー</h1>
            <Button>
                <NavigateBeforeIcon
                    className={classes.icon} 
                    onClick={()=> dispatch(previousMonth()) }
                />
            </Button>
            <Button>
                <NavigateNextIcon 
                    className={classes.icon} 
                    onClick={()=> dispatch(nextMonth()) }
                />
            </Button>

            <p className={classes.headerTitle} >{year}年{month}月</p>
        </div>
    )
}

export default Header
