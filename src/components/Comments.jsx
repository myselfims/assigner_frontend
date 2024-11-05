import React, { useEffect, useState } from "react";
import { baseUrl } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/features/taskDetailsSlice";
import { BsFillSendFill } from "react-icons/bs";
import { io } from "socket.io-client";
import Loader from "./Loader";

const Comments = () => {
  const { comments, modal } = useSelector((state) => state.taskDetails);
  const task = useSelector((state) => state.taskDetails.activeTask);
  const { user } = useSelector((state) => state.currentUser);
  const [comment, setComment] = useState("");
  const [commentBtn, setCommentBtn] = useState(false);
  const dispatch = useDispatch();
  const socket = io(baseUrl);

  useEffect(() => {
    socket.emit("join:comment", task.id);

    // return ()=>{
    //   socket.disconnect()
    // }
  }, []);

  socket.on("comment", (data) => {
    new Audio(
      "https://audio-previews.elements.envatousercontent.com/files/184508/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22D2HAXJZ-new-message-cling.mp3%22"
    ).play();
    setCommentBtn(false);
    dispatch(addComment(data));
  });

  const postComment = () => {
    setCommentBtn(true);
    socket.emit("comment", { comment: comment, task: task.id, user: user.id });
    setComment("");
  };

  return (
    <div className="comments my-4">
      <div className="my-[24px] h-60 overflow-y-auto flex flex-col">
        {comments?.map((item) => {
          return (
            <div key={item?.id} className="border p-2 my-1 rounded bg-blue-100">
              <h1 className="font-bold">{item.comment}</h1>
              <div className="flex justify-between">
                <p className="text-xs text-slate-500">{item?.userId}</p>
                <p className="text-xs text-slate-500">
                  {String(item?.createdAt).slice(11, -8)}
                </p>
              </div>
            </div>
          );
        })}
        {comments?.length == 0 ? <p>No comments!</p> : null}
      </div>
      <div className="flex border-2 rounded p-2 my-3">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          className="w-full outline-none"
          type="text"
        />
        <button
          disabled={commentBtn}
          onClick={postComment}
          className="justify-center items-center font-semibold text-[#3E84F8] "
        >
          {commentBtn ? <Loader /> : <BsFillSendFill className="w-6 h-6" />}
        </button>
      </div>
      <div className="comments"></div>
    </div>
  );
};

export default Comments;
