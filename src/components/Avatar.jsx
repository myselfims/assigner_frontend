import React from "react";
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "./ui/avatar";

const CustomAvatar = ({ className, src, fallback }) => {
  return (
    <AvatarUI className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarUI>
  );
};

export default CustomAvatar;
