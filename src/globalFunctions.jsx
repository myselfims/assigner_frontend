import { format } from 'date-fns';
import { useSelector } from 'react-redux';

export const getRoomId = (user1, user2) => {
    return [user1, user2].sort().join("_");
};
  

export const formatDate = (dateString)=>{
    try{
        const date = new Date(dateString);
    
    // Using date-fns to format the date
        const humanReadableDate = format(date, 'MMMM dd, yyyy');
        return humanReadableDate

    } catch (erro){
        console.log(erro)
        return dateString
    }
}

export function formatChatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return "Just now";
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 172800) {
        return "Yesterday";
    } else {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
}



