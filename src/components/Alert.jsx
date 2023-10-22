import React, { useEffect, useState } from 'react'
import {TiTickOutline} from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../store/features/appGlobalSlice';
import {AiOutlineWarning} from 'react-icons/ai'
import {MdOutlineDangerous} from 'react-icons/md'

const Alert = () => {
    const dispatch = useDispatch()
    const {alert} = useSelector(state=>state.globalState)

    useEffect(()=>{
        setTimeout(() => {
            dispatch(setAlert({alert:false,type:'',message:''}))
        }, 2000);
    })

    const alertTypes = {
      success : {
        color : 'green',
        icon : TiTickOutline
      },
      warn : {
        color : 'yellow',
        icon : AiOutlineWarning
      },
      danger : {
        color : 'red',
        icon : MdOutlineDangerous
      }
    }

  return (
    <div className={`fixed animate-fade bg-${alertTypes[alert.type].color}-500 text-white font-bold rounded flex items-center border-2 p-2 `}>
      <div className='bg-white text-black rounded-full p-2 mr-3'><alertTypes.success.icon className='w-[20px] h-[20px]'/></div>
      <h1>{alert.message}</h1>
    </div>
  )
}

export default Alert
