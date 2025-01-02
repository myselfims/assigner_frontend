import { format } from 'date-fns';

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