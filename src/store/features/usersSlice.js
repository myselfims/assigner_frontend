import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users : [],
    loading : false,
    activeUser : {},
    addUserModal : false,
    confModal : false
}

const usersSlice = createSlice({
    name : 'usersSlice',
    initialState,
    reducers : {
        setUsers : (state, action)=>{
            state.users = action.payload
        },
        addUser : (state, action)=>{
            state.users.push(action.payload)
        },
        removeUser : (state, action)=>{
            state.users = state.users.filter((item)=>item.id!==action.payload)
        },
        setActiveUser : (state, action)=>{
            state.activeUser = action.payload
        },
        setAddUserModal : (state, action)=>{
            state.addUserModal = action.payload
        },
        setConfModal : (state, action)=>{
            state.confModal = action.payload
        },

    }
})

export const {setUsers, addUser, removeUser, setActiveUser, setAddUserModal, setConfModal} = usersSlice.actions
export default usersSlice.reducer