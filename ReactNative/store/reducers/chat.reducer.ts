import { Chatroom, Status } from "../../entities/Chatroom";
import { ADD_CHATROOM, FETCH_CHATROOMS,WRITE_DATA } from "../actions/chat.actions";


//states
interface ReduxState {
    chatrooms: Chatroom[]
    name: string
    Chat: Chatroom

}

const initialState: ReduxState = {
    chatrooms: [],
    name: "Peter",
    Chat: new Chatroom("default", Status.UNREAD, '', new Date())

}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        //adding case statements .here we do something similar to the first case. 
        //We return a new object and spread state inside of it. 
        //Then we override messages and give it the value of a brand new array, 
        //but we want to keep all of the existing messages, 
        //so we spread "state.chatrooms" inside it.
        // Then we add a new object to the end of the array with the user from the state 
        //and the message from the action.
        case ADD_CHATROOM:
            console.log(action.payload);
            return { ...state, chatrooms: [...state.chatrooms, action.payload] } //payload ise gönderilecek veriyi içeren property'dir.

        case FETCH_CHATROOMS:
            // create a new state object with the action.payload assigned to the chatrooms array.
            return { ...state, chatrooms: action.payload }
        case WRITE_DATA: 
            console.log(action.payload);
            return { ...state, Chat: action.payload} 
        
        default:
            return state;
    }
};

export default chatReducer;