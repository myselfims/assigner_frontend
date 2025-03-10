import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    workspaces : []
      ,
    currentWorkspace : null,
    workspaceModal : false,
      
}

export const workspaceSlice = createSlice({
    name : 'workspaceSlice',
    initialState,
    reducers : {
        setCurrentWorkspace : (state, action) => {
            state.currentWorkspace = action.payload
        },
        setWorkspaces : (state, action) => {
            state.workspaces = action.payload
        }, 
        setWorkspaceModal : (state, action)=>{
            state.workspaceModal = action.payload
        }
    }
})

export const {setWorkspaces, setCurrentWorkspace, setWorkspaceModal} = workspaceSlice.actions
export default  workspaceSlice.reducer
