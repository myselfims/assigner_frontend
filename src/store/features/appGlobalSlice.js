import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 'dashboard',
    alert : {alert:false,type:'',message:''},
    darkMode : true,
    sidebar : false,
    auth_info : {token:null}
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
        },
        setAuthInfo : (state, action)=>{
            state.auth_info = action.payload
        }
    }
})

export const {setCurrentPage, setAlert, setDarkMode, setSidebar, setAuthInfo} = appGlobalSlice.actions
export default  appGlobalSlice.reducer
