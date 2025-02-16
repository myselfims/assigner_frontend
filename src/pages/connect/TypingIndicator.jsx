import { useState, useEffect } from "react";

const TypingIndicator = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  const getTypingText = () => {
    if (typingUsers.length === 1) return `${typingUsers[0]} is typing...`;
    if (typingUsers.length === 2) return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    return `${typingUsers.slice(0, 2).join(", ")} and others are typing...`;
  };

  return (
    <div className="text-sm animate-pulse">
      {getTypingText()}
    </div>
  );
};

export default TypingIndicator;
