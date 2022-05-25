import { Messages} from "../entities/Messages"
import { useSelector } from "react-redux"
import axios from "axios"
import { useMutation, useQuery } from "react-query"

const baseUrl ='https://reac-native-95230-default-rtdb.europe-west1.firebasedatabase.app/'





export const useGetMessages=() =>{
    const token = useSelector((state: any) => state.user.idToken)

    const fetchMessages =async() =>{
        return await axios.get(baseUrl+ '/messages.json?auth='+token)
    }



    const{isLoading,isError,data,error}=useQuery('messages',fetchMessages)
    let messages: Messages[]=[];
    for(const key in data?.data) {
        const message =data?.data[key];
        messages.push(new Messages(message.title,message.user,key))
    }
    return {isLoading,isError,messages,error};
}
export const usePostMessage=()=>{
    
    return useMutation( (newMessages:Messages) => {
        return  axios.post(baseUrl+ '/messages.json',newMessages)
    })
}