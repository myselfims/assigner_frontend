import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal : false,
    activeTask : {},
    comments : []
}

export const taskDetailsSlice = createSlice({
    name : 'taskDetailsSlice',
    initialState,
    reducers : {
        setActiveTask : (state, action)=>{
            state.modal = true
            state.activeTask = action.payload
        },
        setComments : (state,action)=>{
            state.comments = action.payload
        },
        addComment : (state,action)=>{
            state.comments.push(action.payload)
        },
        setModal : (state,action)=>{
            state.modal = action.payload
        }
        
    }
})

export const {setActiveTask,setComments,addComment,removeComment,setModal} = taskDetailsSlice.actions
export default taskDetailsSlice.reducer