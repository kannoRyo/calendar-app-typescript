import React, { useCallback, useState } from 'react'
import {DialogTitle,DialogContent, Dialog, DialogActions, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core'
import {TextInput} from './UIKit/index'
import PlaceIcon from '@material-ui/icons/Place';
import DescriptionIcon from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import {addSchedulesAsync} from '../features/schedules/scheduleSlice'

const useStyles = makeStyles({
        dialog:{

        },
        place:{
                display: 'flex'
        },
        icon:{
                height: '45px',
                width: '30px',
                margin: '8px 15px 4px 0',
                display:'block',
        }
})

type ScheduleCreateDialogProps = {
        handleToggle: () => void,
        open: boolean,
        time:{
          year: number,
          month: number,
          date: number
        } | {}
}

const ScheduleCreateDialog = (props: ScheduleCreateDialogProps)=>{
	const classes = useStyles()
	const dispatch = useDispatch()
	const selector = useSelector(state => state)
	const [title, setTitle] = useState('')
	const [place, setPlace] = useState('')
	const [description, setDescription] = useState('')

	const ScheduleInputChange = useCallback((e)=>{
			setTitle(e.target.value)
	},[setTitle])

	const PlaceInputChange = useCallback((e)=>{
			setPlace(e.target.value)
	},[setPlace])
	
	const DescriptionInputChange = useCallback((e)=>{
			setDescription(e.target.value)
	},[setDescription])

	const submitSchedule = async () =>{
		dispatch(addSchedulesAsync(title,place,description,props.time))
		setTitle('')
		setPlace('')
		setDescription('')
	} 

	return (
	<Dialog onClose={props.handleToggle} aria-labelledby="simple-dialog-title" open={props.open} className={classes.dialog} >
			<DialogTitle id="simple-dialog-title">予定の作成</DialogTitle>
			<DialogContent>
					<TextInput
							fullWidth={true}
							label={"予定の入力"}
							multiline={false}
							rows={1}
							value={title}
							type={"text"}
							onChange={ScheduleInputChange}
					/>
					<div className={classes.place} >
							<PlaceIcon className={classes.icon} />
							<TextInput
									fullWidth={true}
									label={"場所"}
									multiline={false}
									rows={1}
									value={place}
									type={"text"}
									onChange={PlaceInputChange}
							/>    
					</div>
					<div className={classes.place} >
							<DescriptionIcon className={classes.icon} />
							<TextInput
									fullWidth={true}
									label={"説明"}
									multiline={false}
									rows={1}
									value={description}
									type={"text"}
									onChange={DescriptionInputChange}
							/>    
					</div>
			</DialogContent>
			<DialogActions>
					<Button 
							onClick={()=>{
								submitSchedule()
								props.handleToggle()
							}}
							color="primary">
					　保存
					</Button>
			</DialogActions>
	</Dialog>       
)
}

export default ScheduleCreateDialog