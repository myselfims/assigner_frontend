import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 'dashboard',
    alert : {alert:false,type:'',message:''},
    darkMode : false,
    sidebar : false,
    auth_info : {token:null},
    role : null,
    user : JSON.parse(localStorage.getItem("user")) || null, 
    notifications : [],
    modals : {
    },
}

export const appGlobalSlice = createSlice({
    name : 'appGlobalSlice',
    initialState,
    reducers : {
        setUser : (state, action)=>{
            state.user = action.payload
        },
        setRole : (state, action)=>{
            state.role = action.payload
        },
        setModal: (state, action) => {
            const { modalName, value } = action.payload;
            state.modals = { ...state.modals, [modalName]: value }; // Square brackets to set dynamic key
        },          
        setNotifications : (state, action) =>{
            state.notifications = action.payload
        },
        addNotification : (state, action) =>{
            state.notifications.push(action.payload)
        },
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

export const {setCurrentPage,setUser, setModal, setRole, setNotifications, addNotification, setAlert, setDarkMode, setSidebar, setAuthInfo} = appGlobalSlice.actions
export default  appGlobalSlice.reducer
