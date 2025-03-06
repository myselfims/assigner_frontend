import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/appGlobalSlice";
import CustomAvatar from "@/components/Avatar";
import Themes from "./themes/Themes";
import { FaRegUser } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import { BsBuildings } from "react-icons/bs";
import { getInitials } from "@/globalFunctions";
import { MdEdit } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { IoMdCheckmark } from "react-icons/io";
import { updateData } from "@/api";
import { setCurrentWorkspace } from "@/store/features/workspaceSlice";

export default function WorkspaceSettings() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const {currentWorkspace} = useSelector(state=>state.workspaceState)
  const [type, setType] = useState(currentWorkspace?.type)
  const [name, setName] = useState(currentWorkspace?.name);
  const [description, setDescription] = useState(currentWorkspace?.description)
  useEffect(() => {
    dispatch(setCurrentPage("Workspace Settings"));
  }, []);

  const updateInfo = ()=>{
    if (name.length > 0){
      updateData(`/workspaces/${currentWorkspace?.id}/`, {name, description}).then((res)=>{
        dispatch(setCurrentWorkspace(res))
        setEdit(false)
      })
    }
  }

  const updateType = (type)=>{
    updateData(`/workspaces/${currentWorkspace?.id}/`, {type}).then((res)=>{
      setType(type)
    })
  }

  return (
    <div className="container mx-auto md:p-6">
      <Card>
        <CardHeader>
          <div className="w-full rounded-md border p-4 bg-gradient-to-tr from-white to-blue-400 relative">
            <div className="flex items-center">
              <CustomAvatar className={"mr-2 md:w-16 md:h-16 text-2xl font-semibold border border-slate-500"} fallback={getInitials(name)} />
              {edit ?
              <Input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="md:text-3xl w-fit"  />
              :
              <h1 className="md:text-4xl text-xl font-bold">{name}</h1>}
            </div>

            {edit?
             <Textarea onChange={(e)=>setDescription(e.target.value)} className="md:text-lg mt-2" value={description} />
             :
            <p className="my-4">
              {description}
            </p>}

           {edit ? 
           <IoMdCheckmark onClick={updateInfo} className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 p-1 cursor-pointer hover:opacity-75 active:opacity-75"/> 
           :

            <MdEdit onClick={()=>setEdit(true)} className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 p-1 cursor-pointer hover:opacity-75 active:opacity-75"/>
           }
          </div>
        </CardHeader>
        <CardContent>
          {/* <Themes /> */}

          <div className="">
            <h1 className="font-semibold text-lg my-2">Workspace Type</h1>
            <div className="gap-4 flex flex-wrap">
              <Button onClick={()=>updateType('Personal')} className={`bg-slate-200 text-black ${type==="Personal" && 'bg-blue-600 text-white'}`}>
                <FaRegUser />
                Personal
              </Button>
              <Button onClick={()=>updateType('Team')} className={`bg-slate-200 text-black ${type==="Team" && 'bg-blue-600 text-white'}`}>
                <PiUsersThreeBold />
                Team
              </Button>
              <Button onClick={()=>updateType('Organization')} className={`bg-slate-200 text-black ${type==="Organization" && 'bg-blue-600 text-white'}`}>
                <BsBuildings />
                Organization
              </Button>
            </div>
          </div>

          <div className="mt-8 shadow-sm bg-white">
            <h2 className="font-semibold text-lg mb-4">Workspace Owner</h2>
            <div className="flex items-center gap-3 text-sm">
              <CustomAvatar
                fallback={"IS"}
                className={"w-10 h-10 rounded-full shadow"}
              />
              <div>
                <h3 className="font-medium">Imran Shaikh</h3>
                <p className="text-gray-500">Owner</p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Transfer Ownership
            </button>
          </div>

          <div className="mt-8 border-t pt-4">
            <h1 className="font-medium text-red-600">Danger Zone</h1>
            <p className="text-sm text-gray-600 mt-1">Once you delete a workspace, there is no going back. Please be certain.</p>
            <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Delete Workspace</button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
