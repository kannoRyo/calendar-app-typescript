import {createSelector, createSlice} from '@reduxjs/toolkit'
import { profile } from 'console'
import{ db, FirebaseTimestamp} from '../../firebase/index'


// sliceの定義
const initialState: any[] =  []
const scheduleSlice = createSlice({
    name: 'time',
    initialState,
    reducers:{
        addSchedules: (state, action) => {
            state.push(action.payload)
        },
        fetchSchedules: (state, action)=>{
            state.push(...action.payload)
        },
        resetSchedule:(state)=>{
            return initialState
        }
    },
})

// 非同期処理
export const addSchedulesAsync = (title: string, place: string, description: string, time: any)=>{
    return async (dispatch: any): Promise<void> =>{
        const schedule = {
            title: title,
            place: place,
            description: description,
            year: time.year,
            month: time.month,
            date: time.date
        }

        await db.collection('schedules').doc().set(schedule)
            .then(()=>{
                dispatch(addSchedules(schedule))
            }).catch((error)=>{
                throw new Error(error)
            })
    }
}

export const fetchSchedulesAsync = (year: number,month: number)=>{
    return async (dispatch: any): Promise<void> =>{
        dispatch(resetSchedule())
        await db.collection('schedules').get()
            .then((snapshots:any)=>{
                const schedules: any[] = []
                snapshots.forEach((snapshot: any)=>{
                    const schedule = snapshot.data()
                    if(schedule.year === year && schedule.month === month){
                        schedules.push(schedule)
                    }
                })
                dispatch(fetchSchedules(schedules))        
            })
    }
}


// action,sliceのexport 
export const {addSchedules,fetchSchedules,resetSchedule} = scheduleSlice.actions
export default scheduleSlice

const schedulesSelector = (state: any) => state.schedules

export const getSchedules = createSelector(
    [schedulesSelector],
    state => state
)