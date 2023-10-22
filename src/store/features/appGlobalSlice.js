import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 'dashboard',
    alert : {alert:false,type:'',message:''},
    darkMode : true,
    sidebar : false
}

export const appGlobalSlice = createSlice({
    name : 'appGlobalSlice',
    initialState,
    reducers : {
        setCurrentPage : (state, action)=>{
            state.currentPage = action.payload
        },
        setAlert : (state, action)=>{
            state.alert = action.payload
        },
        setDarkMode : (state, action)=>{
            state.darkMode = action.payload
        },
        setSidebar : (state, action)=>{
            state.sidebar = action.payload
        }
    }
})

export const {setCurrentPage, setAlert, setDarkMode, setSidebar} = appGlobalSlice.actions
export default  appGlobalSlice.reducer
