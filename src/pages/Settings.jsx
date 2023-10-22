import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDarkMode } from '../store/features/appGlobalSlice'
import ToggleBtn from '../components/toggleBtn'

const Settings = () => {
    const dispatch = useDispatch()
    const { darkMode } = useSelector(state=>state.globalState)


    useEffect(()=>{
        dispatch(setCurrentPage('Settings'))
    },[])

    const handleDarkMode = (mode)=>{
        console.log(mode)
        dispatch(setDarkMode(mode))
    }

  return (
    <div className='w-full flex justify-center'>
    <div className='border-2 w-96 rounded p-4'>
        <div className="flex justify-between">
            <p>Dark Mode </p>
           <ToggleBtn value={darkMode} handler={handleDarkMode}/>
        </div>
    </div>
  </div>
  )
}

export default Settings
