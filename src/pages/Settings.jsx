import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDarkMode } from '../store/features/appGlobalSlice'
import ToggleBtn from '../components/ToggleBtn'

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
    <div className='w-full flex bg-red-300'>
      <div className="flex flex-col border-2 w-96 rounded p-4">
        <h5 className='text-slate-700'>Privacy</h5>
        <div className="flex justify-between my-2">
            <p>Show online status </p>
           <ToggleBtn value={darkMode} handler={handleDarkMode}/>
        </div>
        <div className="flex justify-between my-2">
            <p>Private profile</p>
           <ToggleBtn value={darkMode} handler={handleDarkMode}/>
        </div>
        <div className="flex justify-between my-2">
            <p>Dark Mode </p>
           <ToggleBtn value={darkMode} handler={handleDarkMode}/>
        </div>
      </div>
    <div className='border-2 w-96 rounded p-4'>
      <h5 className='text-slate-700'>Visuals</h5>
        <div className="flex justify-between my-2">
            <p>Dark Mode </p>
           <ToggleBtn value={darkMode} handler={handleDarkMode}/>
        </div>
    </div>
  </div>
  )
}

export default Settings
