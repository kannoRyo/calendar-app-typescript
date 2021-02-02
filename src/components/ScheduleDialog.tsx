import React, { useCallback, useState } from 'react'
import {DialogTitle,DialogContent, Dialog, DialogActions, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core'
import {TextInput} from './UIKit/index'
import PlaceIcon from '@material-ui/icons/Place';
import DescriptionIcon from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import {addSchedulesAsync, deleteScheduleAsync} from '../features/schedules/scheduleSlice'
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';

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
		},
		content:{
			width:'350px',
			'& h2':{
				fontSize: '25px',
				marginBottom: '15px'
			},
			'& p':{
				fontSize: '18px',
				marginBottom: '15px',
				opacity: '0.8'				
			}
		},
		detailTitle:{
			display: 'flex',
			justifyContent: 'space-between'
		},
		detailIcon:{
			width: '33px',
			cursor: 'pointer'
		}
})

type ScheduleCreateDialogProps = {
        handleToggle: () => void,
        open: boolean,
        time:{
          year: number,
          month: number,
          date: number
		} | {},
		detail?: any
}

const ScheduleDialog = (props: ScheduleCreateDialogProps)=>{
	const classes = useStyles()
	const dispatch = useDispatch()
	const selector = useSelector(state => state)
	const [title, setTitle] = useState('')
	const [place, setPlace] = useState('')
	const [description, setDescription] = useState('')

	console.log(props.detail)

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
		<>
		<Dialog onClose={props.handleToggle} aria-labelledby="simple-dialog-title" open={props.open} className={classes.dialog} >
		{
			(!props.detail.title) ? (
				<>
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
				</>
			):(
				<> 
					<DialogTitle id="simple-dialog-title" >
						<div className={classes.detailTitle}>
							<div>
								<p>■ 予定</p>	
							</div>
							<div>
								<DeleteIcon className={classes.detailIcon} 
									onClick={()=> {
										dispatch(deleteScheduleAsync(props.detail.created_at))
										props.handleToggle()
									}}
								/>
								<ClearIcon  className={classes.detailIcon} 
									onClick={()=> props.handleToggle()}
								/>
							</div>
						</div>
					</DialogTitle>	
					<DialogContent className={classes.content} >
						<h2>タイトル: {props.detail.title}</h2>
						<p>日付: {`${props.detail.month}月${props.detail.date}日`}</p>
						<p>場所: {props.detail.place}</p>
						<p>説明: {props.detail.description}</p>
					</DialogContent>
				</>
			)}
			</Dialog>       
		</>
)
}

export default ScheduleDialog