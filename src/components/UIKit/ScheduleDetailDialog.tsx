import React from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';

type ScheduleCreateDialogProps = {
    handleToggle: () => void,
    open: boolean,
}

const ScheduleDetailDialog = (props: ScheduleCreateDialogProps)=>{

	return (
        <Dialog onClose={props.handleToggle} aria-labelledby="simple-dialog-title" open={props.open}  >
        <DialogTitle id="simple-dialog-title">予定の作成</DialogTitle>
        <DialogContent>
           
        </DialogContent>
        </Dialog>           
)
}

export default ScheduleDetailDialog