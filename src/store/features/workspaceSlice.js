import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    workspaces : [
        {
          "id": "ws_001",
          "name": "sdfa Inc",
          "role": "Admin",
          "subscription": {
            "plan": "Pro",
            "billingCycle": "Annual",
            "nextBillingDate": "2025-02-10"
          }
        },
        {
          "id": "ws_002",
          "name": "Freelance Hub",
          "role": "Member",
          "subscription": {
            "plan": "Free",
            "billingCycle": "N/A",
            "nextBillingDate": null
          }
        }
      ]
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
