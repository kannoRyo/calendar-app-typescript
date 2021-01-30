import {createSelector, createSlice} from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState =  dayjs()

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers:{
        nextMonth: (state):any  => {
            state.add(1, 'month')
        },
        previousMonth: (state):any => {
            state.add(-1, 'month')
        }
    },
})

export const {nextMonth, previousMonth} = timeSlice.actions
export default timeSlice


// Selector Function

const timeSelector = (state:any) => state.time

export const getYear = createSelector(
    [timeSelector],
    state => state
)

export const getMonth = createSelector(
    [timeSelector],
    state => state
)

