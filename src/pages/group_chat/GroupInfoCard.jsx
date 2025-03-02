import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import CustomAvatar from "@/components/Avatar";
import UsersList from "../connect/UsersList";
import { useSelector } from "react-redux";

const GroupInfoCard = ({ onClose }) => {
  const { members } = useSelector((state) => state.actionItems);
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
        <h1 className="font-semibold">Group Information</h1>
        <Button size="sm" variant="ghost" onClick={onClose}>
          ✖️
        </Button>
      </div>
      <div className="space-y-2 text-sm">
        <h1>Members </h1>
        <UsersList users={members} />
      </div>
    </motion.div>
  );
};

export default GroupInfoCard;
