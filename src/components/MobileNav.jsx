import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebar } from '../store/features/appGlobalSlice'

const MobileNav = () => {
  const dispatch = useDispatch()
  const {sidebar} = useSelector(state=>state.globalState)
  return (
    <div className='hidden max-sm:flex w-screen justify-between bg-[#4285F4] p-2 absolute top-0 left-0'>
      <div className="logo">
        <h1 className='font-bold text-2xl text-white'>EasyAssigns</h1>
      </div>
      <div className="">
        <GiHamburgerMenu onClick={()=>{sidebar?dispatch(setSidebar(false)):dispatch(setSidebar(true))}} className='w-8 border p-1 rounded text-white h-8'/>
      </div>
    </div>
  )
}

export default MobileNav
