import {configureStore} from '@reduxjs/toolkit'
import tasksReducers from './features/tasksSlice'
import taskDetailsSlice from './features/taskDetailsSlice'
import appGlobalSlice from './features/appGlobalSlice'
import usersSlice from './features/usersSlice'
import userDetailsSlice from './features/userDetailsSlice'

export const store = configureStore({
    reducer : {
        tasks : tasksReducers,
        taskDetails : taskDetailsSlice,
        globalState : appGlobalSlice,
        users : usersSlice,
        currentUser : userDetailsSlice,
    },
})