import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core'
import {ScheduleDetailDialog} from './index'

const useStyles = makeStyles({
    bar:{
        width:'90%',
        margin:'5px auto',
        backgroundColor: '#6aa7d0',
        padding: '6px 0',
        borderRadius: '4px',
        color: '#f5f5f5',
        cursor: 'pointer'
    }
})

const ScheduleBar = (props: any)=>{
    const classes = useStyles()
    const [isDetail, setIsDetail] = useState(false)

    const handleIsDetail = () =>{
        setIsDetail(!isDetail)
    }

	return (
    <>
        <div 
            className={classes.bar} 
            // onClick={()=> {
            //     props.handleIsCreate()
            //     handleIsDetail()
            // }}
        >
            {props.schedule.title}
        </div>
        <ScheduleDetailDialog handleToggle={()=>handleIsDetail()} open={isDetail} />
    </>
)
}

export default ScheduleBar
