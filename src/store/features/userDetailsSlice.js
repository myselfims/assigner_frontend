import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {},
    loading : false
}

const userDetailsSlice = createSlice({
    name : 'userDetailsSlice',
    initialState,
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload
        },
        setName : (state,action)=>{
            state.name = action.payload
        },
        setPassword : (state,action)=>{
            state.name = action.payload
        },
        setLoading : (state,action)=>{
            state.loading = action.payload
        }
    }
})

export const {setUser, setName, setPassword, setLoading} = userDetailsSlice.actions
export default userDetailsSlice.reducer