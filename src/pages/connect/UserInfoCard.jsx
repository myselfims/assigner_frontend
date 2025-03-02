import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const UserInfoCard = ({ user, onClose }) => {
  const slideDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={slideDown}
      className="absolute z-20 p-4 w-72 bg-white rounded-2xl shadow-lg text-sm text-nowrap border"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold">User Information</h1>
        <Button size="sm" variant="ghost" onClick={onClose}>
          ✖️
        </Button>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium text-base">{user.name}</h2>
          <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-blue-600 cursor-pointer">
          <Mail size={16} /> {user.email}
        </p>
        {user.phone && (
          <p className="flex items-center gap-2 cursor-pointer">
            <Phone size={16} /> {user.phone}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default UserInfoCard;
