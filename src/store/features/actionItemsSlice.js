import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks : [],
    sprints : [],
    loading : false,
    selectedStatusOptions : [],
    statuses : [],
    searchQuery : '',
    project : null,
    members : [],
    role : null,
}

export const actionItemsSlice = createSlice({
    name :'actionItems',
    initialState,
    reducers : {
        setRole : (state, action)=>{
            state.role = action.payload
        },
        setTasks : (state, action)=>{
            state.tasks = action.payload
        },
        setMembers : (state, action)=>{
            state.members = action.payload
        },
        setProject : (state, action)=>{
            state.project = action.payload
        },
        setSprints : (state, action)=>{
            state.sprints = action.payload
        },
        setStatuses : (state, action)=>{
            state.statuses = action.payload
        },
        setSearchQuery : (state, action)=>{
            state.searchQuery = action.payload
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
        },
        setSelectedStatusOptions : (state, action)=>{
            state.selectedStatusOptions = action.payload
        }
    }
})


export const {setTasks, setRole, setMembers,setProject ,setSprints, setSearchQuery, addTask,removeTask,updateTask, setLoading, setSelectedStatusOptions, setStatuses} = actionItemsSlice.actions
export default actionItemsSlice.reducer