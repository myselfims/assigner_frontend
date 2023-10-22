import React, { useEffect, useState } from "react";
import { setAlert, setCurrentPage } from "../store/features/appGlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { fetchData, updateData } from "../api";
import { setName, setUser } from "../store/features/userDetailsSlice";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Loader from "../components/Loader";
import { setLoading } from "../store/features/userDetailsSlice";
import Compressor from 'compressorjs'

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.currentUser);
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [avatar, setAvatar] = useState(null);
  const [updateBtn,setUpdateBtn] = useState(false)

  useEffect(() => {
    dispatch(setCurrentPage("Profile"));
    fetchData(`/users/self`).then((res) => {
      setName(res.data.name);
      setPassword(res.data.password);
      dispatch(setUser(res.data));
    });
  }, []);

  const handleUpdate = ()=>{
    setUpdateBtn(true)
    updateData(`/users/${user.id}`,{name,password}).then((res)=>{
      dispatch(setUser(res.data))
      setUpdateBtn(false)
      dispatch(setAlert({alert:true,type:'success',message:'Profile updated!'}))
    })
  }

  const uploadAvatar = (e) => {
    setAvatar(e.target.files[0]);
    if (avatar == null) return;
    dispatch(setLoading(true));
    const imageRef = ref(storage, `avatars/${avatar.name + v4()}`);
    if (user.avatar){
      let avatarRef = ref(storage,user.avatar)
      deleteObject(avatarRef).then((res)=>{
        console.log(res)
      })
    }

    new Compressor(avatar, {
      quality: 0.6,
      success(result) {
        uploadBytes(imageRef, result).then((res) => {
          getDownloadURL(res.ref).then((url) => {
            updateData(`/users/${user.id}/`, { avatar : url }).then((res) => {
              dispatch(setLoading(false));
              dispatch(setUser(res.data));
            });
          });
        });
      },
      error(err) {
        console.log(err.message);
      },
    });

  };

  return (
    <div className="w-full flex justify-center">
      <div className="border-2 rounded p-4">
        <div className="head flex justify-center">
          <label htmlFor="file">
            <div
              className="w-[60px] overflow-hidden group cursor-pointer bg-center bg-no-repeat bg-cover rounded-full h-[60px] flex items-center justify-center bg-gradient-to-t from-blue-500 to-blue-300 text-white font-serif
              "
            >
              <input
                onChange={uploadAvatar}
                id="file"
                className="sr-only"
                type="file"
              />

              {loading ? (
                <Loader />
              ) : (
                <>
                  {user.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <h1 className="font-bold text-2xl">I</h1>
                  )}
                </>
              )}
            </div>
          </label>
        </div>
        <div className="body">
          <div className="flex my-4 flex-col">
            <label htmlFor="">Name</label>
            <input
              value={name}
              className="border-2 w-96 rounded p-2 bg-white"
              type="text"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="flex my-4 flex-col">
            <label htmlFor="">Email</label>
            <input
              disabled
              value={user?.email}
              readOnly
              className="border-2 cursor-no-drop w-96 rounded p-2 bg-white"
              type="text"
            />
          </div>
          <div className="flex my-4 flex-col">
            <label htmlFor="">Password</label>
            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="border-2 w-96 rounded p-2 bg-white"
              type="password"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="">Is Admin</label>
            {user.isAdmin ? (
              <h1 className="w-12 bg-green-500 rounded text-center flex items-center text-white justify-center font-bold">
                True
              </h1>
            ) : (
              <h1 className="w-12 bg-red-500 rounded text-center flex items-center text-white justify-center font-bold">
                False
              </h1>
            )}
          </div>
          <div className="my-5">
            <button disabled={updateBtn} onClick={handleUpdate} className="w-full bg-blue-500 text-white text-center font-bold p-2 rounded">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
