import React, { useEffect, useRef } from "react";
import { fetchData } from "../../api";

const NotificationsDropdown = ({setNotiDropdown}) => {
  const dropDownRef = useRef()
  const text = 'adipisicing elit. Praesentium, impedit? Unde, at! Error, obcaecati necessitatibus! Expedita praesentium aut iste deserunt? Quibusdam deserunt ab omnis quas voluptatem aliquam adipisci officia ducimusadipisicing elit. Praesentium, impedit? Unde, at! Error, obcaecati necessitatibus! Expedita praesentium aut iste deserunt? Quibusdam deserunt ab omnis quas voluptatem aliquam adipisci officia ducimus'

  useEffect(()=>{
    fetchData('/notifications').then((res)=>(
      console.log(res)
    ))
  },[])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setNotiDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <>
      {true && (
        <div ref={dropDownRef} className="absolute scrollbar-none top-8 right-0 mt-2 w-96 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 h-96 overflow-y-scroll">
          <ul className="py-1 text-gray-700">
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              {String(text)?.length >= 90 ? text.slice(0,90)+'...' : text }
              <p className="text-xs text-slate-500">2 hours ago</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NotificationsDropdown;
