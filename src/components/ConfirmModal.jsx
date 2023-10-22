import React from 'react'

const ConfirmModal = ({confirm,message}) => {
  return (
    <div className="w-screen bg-[#00000080] flex justify-center items-center top-0 left-0 h-screen fixed">
      <div className="main overflow-hidden w-96 bg-white rounded-md">
        <div className="head px-3 py-1 bg-slate-100 border-b text-xl ">
          <h1>Please Confirm!</h1>
        </div>
        <div className="body p-3">
          <h1 className='text-xl mb-6 font-semibold'>{message}</h1>
          <div className="btn flex my-2">
            <button onClick={()=>confirm(true)} className='bg-blue-500 mx-1 rounded w-full p-2 font-semibold text-white'>Yes</button>
            <button onClick={()=>confirm(false)} className='bg-red-500 mx-1 rounded w-full p-2 font-semibold text-white'>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
