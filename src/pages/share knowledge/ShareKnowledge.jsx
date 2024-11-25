import React from 'react'

const ShareKnowledge = () => {
  return (
    <div className='w-full bg-red-700'>

        <div className="header">
            <div className="">
                <input type="text" placeholder='Title' className='w-full outline-none p-2 border border-blue-400 rounded-lg'/>
            </div>
        </div>
        <div className="body my-4">
            <textarea className='w-full outline-none p-2 border h-96 border-blue-400 rounded-lg h-6/12' name="" id=""></textarea>
        </div>
      
    </div>
  )
}

export default ShareKnowledge
