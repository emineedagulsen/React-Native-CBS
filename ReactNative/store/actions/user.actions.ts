import * as SecureStore from 'expo-secure-store';
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import { User } from '../../entities/User';


//action types 

export const SIGNUP = 'SIGNUP';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const LOGOUT = 'LOGOUT';
export const CHANGEMAIL = 'CHANGEMAIL';
export const SIGNIN = 'SIGNIN';


export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

//action creator
export const logout = () => {
    SecureStore.deleteItemAsync('idToken');//delete user and token from SecureStore
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}



export const changeemail = (email:string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​
        const idToken = getState().user.idToken;
        const loggedInUser = getState().user.loggedInUser;

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD8-bqrZLsuA9F-MDaE25i58srKOz5gaBg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                idToken: idToken,
                email:email,
                returnSecureToken: false
            })
        });

        // console.log(response.json());

        if (!response.ok) {
            
            //There was a problem..
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
        } else {
            const data: FirebaseSignupSuccess = await response.json();
                console.log("data from server", data);

                const user = new User(data.email,  '', '');

                await SecureStore.setItemAsync('idToken', JSON.stringify(data.idToken));
                await SecureStore.setItemAsync('user', JSON.stringify(user)); 

                dispatch({ type: CHANGEMAIL, payload: { user, idToken: data.idToken } })//action
        }
    };
};


//login


export const signin = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8-bqrZLsuA9F-MDaE25i58srKOz5gaBg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email:email,
                password:password,
                returnSecureToken: true
            })
        });

        // console.log(response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNI_FAILED, payload: 'something'})
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');
            
            //save user object and token in SecureStore

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json string to be saved and recreated when read

            dispatch({ type: SIGNIN, payload: { user, idToken: data.idToken } })
        }
    };
};






//kayıt

export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8-bqrZLsuA9F-MDaE25i58srKOz5gaBg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNI_FAILED, payload: 'something'})
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

        }
    };

      
    
};
