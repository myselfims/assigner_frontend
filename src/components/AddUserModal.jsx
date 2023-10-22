import React from 'react'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setAddUserModal } from '../store/features/usersSlice'
import { useFormik } from 'formik'
import { signupSchema } from '../validation/validation_schema'
import { postData } from '../api'
import Alert from './Alert'
import { setAlert } from '../store/features/appGlobalSlice'

const initialValues = {
    name : '',
    email : '',
    password : '',
}

const AddUserModal = () => {


    const dispatch = useDispatch()
    const {values,errors,handleBlur,handleChange, handleSubmit} = useFormik({
        initialValues,
        validationSchema : signupSchema,
        onSubmit : (data)=>{
            console.log(data)
            console.log('submitting...')
            postData('/users/',data).then((res)=>{
                console.log(res.data)
            }).catch((er)=>{
                dispatch(setAlert({alert:true,type:'success',message:'hello user'}))
            })
        }

    })

  return (
    <div className="w-screen absolute flex justify-center items-center top-0 left-0 h-screen bg-[#00000080]">
      <div className="main w-[544px] bg-[#FFFFFF] rounded-lg ">
        <div className="head px-[24px] items-center py-[16px] border-b border-slate-200 flex justify-between text-[20px]">
          <h1 className="text-[20px] ">Add New User</h1>
          <button
            onClick={() => dispatch(setAddUserModal(false))}
            className="text-[#999CA0] hover:opacity-70"
          >
            <AiOutlineClose className="w-[24px] h-[24px]" />
          </button>
        </div>

        <div className="p-[24px]">
          <form onSubmit={handleSubmit}>
            <div className="inputs flex flex-col items-center my-4">
              <div className="my-3 flex flex-col">
                <p>Name</p>
                <input
                    value={values.name}
                    name="name"
                    type="text"
                    placeholder='Name here'
                    className='rounded-xl bg-[#F5F5F5] w-[356px] mt-2 h-[43.91px] p-3 outline-none 
                    '
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p>{errors.name}</p>
              </div>
              <div className="my-3 flex flex-col">
                <p>Email</p>
                <input
                    value={values.email}
                    name="email"
                    type="email"
                    placeholder='Email here'
                    className='rounded-xl bg-[#F5F5F5] w-[356px] mt-2 h-[43.91px] p-3 outline-none 
                    '
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <p>{errors.email}</p>
              </div>
              <div className="my-3 flex flex-col">
                <p>Password</p>
                <input
                    value={values.password}
                    name="password"
                    type="password"
                    placeholder='Password here'
                    className='rounded-xl bg-[#F5F5F5] w-[356px] mt-2 h-[43.91px] p-3 outline-none 
                    '
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <p>{errors.password}</p>
              </div>
              <div className="flex my-2">
                <button
                  type="submit"
                  className="rounded-[8px] w-full flex justify-center items-center font-semibold bg-[#3E84F8] text-white px-[16px] py-[8px] hover:opacity-75"
                >
                  Add 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default AddUserModal
