import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    workspaces : []
      ,
    currentWorkspace : null
      
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
        }
    }
})

export const {setWorkspaces, setCurrentWorkspace} = workspaceSlice.actions
export default  workspaceSlice.reducer
