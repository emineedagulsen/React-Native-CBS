
import * as SecureStore from 'expo-secure-store';
import { Chatroom, Status } from "../../entities/Chatroom";



export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';
export const WRITE_DATA = 'WRITE_DATA';




export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const chat = getState().chat.chatrooms;

        
        const response = await fetch(
            'https://reac-native-95230-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // console.log(await response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: FETCH_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
            let chatrooms: Chatroom[] = []
            for (const key in data) {
                // create Chatroom objects and push them into the array chatrooms.
                const obj = data[key];
                chatrooms.push(new Chatroom(obj.user, obj.status, obj.message, new Date(obj.timestamp), key))

            }

            console.log("chatrooms", chatrooms);
           
            await SecureStore.setItemAsync('chat', JSON.stringify(data.chat));
            await SecureStore.setItemAsync('user', JSON.stringify(chatrooms)); 

            dispatch( {type: 'FETCH_CHATROOMS', payload :chatrooms } )
        }
        
    };
}

export const addChatroom = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
        const response = await fetch(
            'https://reac-native-95230-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatroom
                
             } )
        });

        // console.log(await response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
           
            console.log("data from server", data);
            chatroom.id = data.name;
            
            dispatch({ type: ADD_CHATROOM, payload: chatroom })
        }
        
    };
}
export const write_data = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        if (chatroom.status !== Status.READ) {

            chatroom.status = Status.READ;

            //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
            const response = await fetch(
                `https://reac-native-95230-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/status.json?auth=` + token, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    Status.READ
                )
            });

            if (!response.ok) {
                //There was a problem..
                //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
            } else {
                const data = await response.json(); // json to javascript
                // let chatrooms = []
                // for (const key in data) {
                //     console.log(data[key].name)​
                // }
                console.log("data from server", data);

            }
        }
        
        dispatch({ type: WRITE_DATA, payload: chatroom })
    };
}