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
        },
        deleteSchedule:(state, action)=>{
            state.push(...action.payload)
        }
    },
})

// 非同期処理
export const addSchedulesAsync = (title: string, place: string, description: string, time: any)=>{
    return async (dispatch: any): Promise<void> =>{
        const timestamp = FirebaseTimestamp.now()
        const schedule = {
            title: title,
            place: place,
            description: description,
            year: time.year,
            month: time.month,
            date: time.date,
            created_at: timestamp
        }

        await db.collection('schedules').doc(timestamp.toString()).set(schedule)
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
            }).catch((error)=>{
                throw new Error(error)
            })
    }
}

export const deleteScheduleAsync = (id: any) =>{
    console.log(id)
    return async (dispatch: any, getState: any): Promise<void>  =>{
        await db.collection('schedules').doc(id.toString()).delete()
            .then(()=>{
                const prevSchedules = getState().schedules
                const nextSchedules = prevSchedules.filter((schedule:any)=> schedule.created_at !== id)
                dispatch(resetSchedule())
                dispatch(deleteSchedule(nextSchedules))
            })
    }
}



// action,sliceのexport 
export const {addSchedules,fetchSchedules,resetSchedule, deleteSchedule} = scheduleSlice.actions
export default scheduleSlice

const schedulesSelector = (state: any) => state.schedules

export const getSchedules = createSelector(
    [schedulesSelector],
    state => state
)