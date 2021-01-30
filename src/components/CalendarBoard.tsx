import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    board:{
        height: '92vh'
    }
})

const CalendarBoard = ()=>{
    const classes = useStyles()

	return (
	<div className={classes.board} >
        CalendarBoard
    </div>
)
}

export default CalendarBoard
