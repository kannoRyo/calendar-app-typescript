import { combineReducers } from 'redux'
import timeSlice from '../time/timeSlice'

export const rootReducer = combineReducers({
    time: timeSlice.reducer
})