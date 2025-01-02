import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Loader = ({className}) => {

  return (
    <div>
      <AiOutlineLoading3Quarters className={`animate-spin ${className}`} />
    </div>
  )
}

export default Loader
