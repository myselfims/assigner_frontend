import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import RequestCard from './RequestCard';
import { fetchData } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '@/store/features/appGlobalSlice';
import { useSearchParams } from 'react-router-dom';

const RequestModal = () => {
    const [requests, setRequests] = useState([])
    const {modals} = useSelector(state=>state.globalState);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        console.log('fetching...')
        fetchData('/global/requests').then((res)=>{
            setRequests(res)
        })
    },[modals['requestModal']])

    const handleClose = ()=>{
        dispatch(setModal({ modalName: "requestModal", value: false }));
        searchParams.delete("showModal"); // Remove parameter
        setSearchParams(searchParams); // U
    }

  return (
    <Dialog open={modals['requestModal']} onOpenChange={handleClose}>
      <DialogContent className="h-[80vh] overflow-hidden bg-slate-200 flex flex-col p-0">
        <DialogTitle className="p-4">Requests</DialogTitle>
        <div className="overflow-y-scroll flex flex-col gap-4 h-full px-4">
            {requests?.length > 0 ? (
            requests?.map((request, index) => (
                <RequestCard index={index} request={request}/>
            ))
            ) : (
            <p className="text-center text-gray-500">No requests available</p>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
