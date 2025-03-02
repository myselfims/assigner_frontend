import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    logs : []
}

export const activityLogsSlice = createSlice({
    name  : 'activityLogsSlice',
    initialState : initialState,
    reducers : {
        setLogs : (state, action)=>{
            state.logs = action.payload
        },
        addLog : (state, action)=>{
            state.logs.unshift(action.payload)
        }
    }
})

export const {setLogs, addLog} = activityLogsSlice.actions

export default activityLogsSlice.reducer