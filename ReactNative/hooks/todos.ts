import { Messages} from "../entities/Messages"
import { useSelector } from "react-redux"
import axios from "axios"
import { useMutation, useQuery } from "react-query"

const baseUrl ='https://reac-native-95230-default-rtdb.europe-west1.firebasedatabase.app/'



//getting all messages from firebase and convert to array

export const useGetMessages=() =>{
    const token = useSelector((state: any) => state.user.idToken)
    
    const fetchMessages =async() =>{
        return await axios.get(baseUrl+ 'chatrooms/messages.json?auth='+token)//axios is lib which provide HTTP calls easily in client side app 
    }



    const{isLoading,isError,data,error}=useQuery('messages',fetchMessages)
    let messages: Messages[]=[];
    for(const key in data?.data) {
        const message =data?.data[key];
        messages.push(new Messages(message.title,message.user,key))
    }
    return {isLoading,isError,messages,error};
}



//create a new message
export const usePostMessage=()=>{
    const token = useSelector((state: any) => state.user.idToken)

    return useMutation( (newMessages:Messages) => {
        return  axios.post(baseUrl+ 'chatrooms/messages.json?auth='+token,newMessages)
    })
}

