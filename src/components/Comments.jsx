import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillSendFill } from "react-icons/bs";
import { fetchData, postData } from "@/api";
import socketService from "@/api/socket";
import { formatChatTimestamp } from "@/globalFunctions";
import { MentionsInput, Mention } from "react-mentions";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const task = useSelector((state) => state.taskDetails.activeTask);
  const { user } = useSelector((state) => state.globalState);
  const { members } = useSelector((state) => state.actionItems);
  const [comment, setComment] = useState("");
  const socket = socketService.connect();

  useEffect(() => {
    socket.emit("join:comment", task.id);
    socket.on("comment", (data) => {
      setComments((prev) => [...prev, data]);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchData(`/tasks/${task?.id}/comments`).then((res) => {
      setComments(res);
    });
  }, [task]);

  const postComment = () => {
    if (comment.trim().length > 2) {
      postData(`/tasks/${task?.id}/comments`, { comment }).then(() => {
        setComment("");
      });
    }
  };

  const highlightMentions = (text) => {
    const mentionRegex = /\@\[(.+?)\]\(\d+\)/g; // Match @ followed by [Name](ID)
    return text.split(mentionRegex).map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className="text-blue-500 font-bold">
          @{part}
        </span>
      ) : (
        part
      )
    );
  };
  
  

  return (
    <div className="comments my-4 flex flex-col">
      <div className="h-[40vh] overflow-y-auto flex flex-col">
        {comments?.map((item) => (
          <div key={item.id} className="border p-2 my-1 rounded bg-blue-100">
            <p className="text-xs text-slate-500">
              {user?.id === item.user?.id ? "You" : item.user?.name}
            </p>
            <div className="flex justify-between">
              <h1 className="font-medium">{highlightMentions(item.comment)}</h1>
              <p className="text-xs text-slate-500">
                {formatChatTimestamp(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
        {comments?.length === 0 && <p>No comments!</p>}
      </div>

      <div className="border-2 rounded p-2 my-3 flex">
        <MentionsInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full outline-none"
          style={{
            input: {
              outline: "none",
              border: "none",
              width: "100%",
            },
            suggestions: {
              list: {
                backgroundColor: "white",
                border: "1px solid #ccc",
                zIndex: 10,
              },
              item: {
                padding: "5px 10px",
                cursor: "pointer",
              },
            },
          }}
        >
          <Mention
            trigger="@"
            data={members.map((u) => ({ id: u.id, display: u.name }))}
            markup="@[__display__](__id__)"
            className="text-blue-500 font-bold"
          />
        </MentionsInput>
        <button onClick={postComment} className="text-[#3E84F8]">
          <BsFillSendFill className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Comments;
