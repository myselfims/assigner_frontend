import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks : [],
    loading : false
}

export const tasksSlice = createSlice({
    name :'tasks',
    initialState,
    reducers : {
        setTasks : (state, action)=>{
            state.tasks = action.payload
        },
        addTask : (state, action)=>{
            state.tasks.push(action.payload)
        },
        removeTask : (state, action)=>{
            state.tasks = state.tasks.filter((item)=>item.id!=action.payload)
        },
        updateTask : (state, action)=>{
            let task = state.tasks.filter((item)=>item.id==action.payload)[0]
            for (let key in Object.keys(action.payload)){
                task[key] = action.payload[key]
            }
        },
        setLoading : (state, action)=>{
            state.loading = action.payload
        }
    }
})


export const {setTasks, addTask,removeTask,updateTask, setLoading} = tasksSlice.actions
export default tasksSlice.reducer