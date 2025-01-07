import React, { useEffect } from 'react';
import { TiTickOutline } from 'react-icons/ti';
import { AiOutlineWarning } from 'react-icons/ai';
import { MdOutlineDangerous } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../store/features/appGlobalSlice';
import { motion } from 'framer-motion';

const Alert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.globalState);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setAlert({ alert: false, type: '', message: '' }));
    }, 3000);

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [alert, dispatch]);

  const alertTypes = {
    success: {
      color: 'bg-green-400',
      icon: TiTickOutline,
      borderColor: 'border-green-600',
    },
    warn: {
      color: 'bg-yellow-300',
      icon: AiOutlineWarning,
      borderColor: 'border-yellow-500',
    },
    danger: {
      color: 'bg-red-400',
      icon: MdOutlineDangerous,
      borderColor: 'border-red-600',
    },
  };

  if (!alert.alert) return null;

  const AlertIcon = alertTypes[alert.type]?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg 
        ${alertTypes[alert.type]?.color} ${alertTypes[alert.type]?.borderColor} border-2`}
    >
      <div className="flex items-center justify-center bg-white text-black rounded-full p-2 mr-3">
        {AlertIcon && <AlertIcon className="w-6 h-6" />}
      </div>
      <h1 className="text-white font-semibold">{alert.message}</h1>
    </motion.div>
  );
};

export default Alert;
