import { Chatroom, Status } from "../../entities/Chatroom";
import { ADD_CHATROOM, FETCH_CHATROOMS,WRITE_DATA } from "../actions/chat.actions";

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
        
        case ADD_CHATROOM:
            console.log(action.payload);
            return { ...state, chatrooms: [...state.chatrooms, action.payload] }

        case FETCH_CHATROOMS:
            // create a new state object with the action.payload assigned to the chatrooms array.
            return { ...state, chatrooms: action.payload }
        case WRITE_DATA: 
            console.log(action.payload);
            return { ...state, openChat: action.payload} 
        
        default:
            return state;
    }
};

export default chatReducer;