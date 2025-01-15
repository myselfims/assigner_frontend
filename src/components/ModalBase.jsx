import React from 'react'
import { motion, AnimatePresence } from "motion/react";

const ModalBase = ({children}) => {
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-screen z-40 absolute flex justify-center items-center top-0 left-0 h-screen bg-[#00000080]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ scale: 0 }}
        className="main overflow-y-scroll scrollbar-none max-sm:w-screen w-[544px] bg-[#FFFFFF] rounded-lg "
      >
        {children}
      </motion.div>
      </motion.div>
      </AnimatePresence>
  )
}

export default ModalBase
