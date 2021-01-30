import React from 'react'
import {makeStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import EventIcon from '@material-ui/icons/Event';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
        margin: '0 0 0 10px',
        lineHeight: '67px'
    },
    headerTitle:{
        fontSize: '20px',
        marginLeft: '25px'
    }
})

const Header = ()=>{
    const classes = useStyles()

	return (
        <div className={classes.header} >
            <MenuIcon className={classes.icon} />
            <EventIcon className={classes.icon} color="primary" />
            <h1 className={classes.title} >カレンダー</h1>
            <NavigateBeforeIcon className={classes.icon} />
            <NavigateNextIcon className={classes.icon} />
            <p className={classes.headerTitle} >◯年◯月</p>
        </div>
    )
}

export default Header
