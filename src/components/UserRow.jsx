import React, { useEffect, useState } from 'react'

import ConfirmModal from '../components/ConfirmModal'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveUser } from '../store/features/usersSlice'
import { updateData } from '../api'

const UserRow = ({user}) => {
  const [confModal, setConfModal] = useState(false)
  const dispatch = useDispatch()
  const [isAdmin, setAdmin] = useState(user.isAdmin)
  const [isAdminValue, setAdminValue] = useState(user.isAdmin)
  const {tasks} = useSelector(state=>state.tasks)
  

  const handleBtns = (value)=>{
    setAdminValue(value)
    
    setConfModal(true)
  }

  const adminToggle = (confirmation)=>{
    
    // 
    if (confirmation){
      
      updateData(`/users/${user.id}`,{isAdmin:isAdminValue})
      .then((res)=>{
        setAdmin(res.data.isAdmin)
      })
    }
    setConfModal(false)
  }

  return (
    <tr onClick={()=>dispatch(setActiveUser(user))} className="hover:bg-slate-100 cursor-pointer">
      <td className="border-2 p-2">
        <h1 className="font-bold">{user?.name}</h1>
      </td>
      <td className="border-2 p-2">
        <p className="text-center">{user?.email}</p>
      </td>
      <td className="border-2 p-2">
        <p className="text-center border rounded-full bg-yellow-300">
          {tasks?.filter((item)=>item.assignedToId == user.id).length}
        </p>
      </td>
      <td className="border-2">
        <div className="flex justify-between p-2 text-black">
          <button onClick={()=>handleBtns(true)} className={`p-1 border-2 ${isAdmin?'bg-blue-600 text-white':null} rounded px-3`}>True</button>
          <button onClick={()=>handleBtns(false)} className={`p-1 border-2 ${!isAdmin?'bg-blue-600 text-white':null} rounded px-3`}>False</button>
        </div>
      </td>
      {confModal ? (
        <ConfirmModal
          message={"Are you sure?"}
          confirm={adminToggle}
        />
      ) : null}
    </tr>
  )
}

export default UserRow
