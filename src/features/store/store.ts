import { combineReducers } from 'redux'
import timeSlice from '../time/timeSlice'
import schedulesSlice from '../schedules/scheduleSlice'
import scheduleSlice from '../schedules/scheduleSlice'

export const rootReducer = combineReducers({
    time: timeSlice.reducer,
    schedules: scheduleSlice.reducer
})