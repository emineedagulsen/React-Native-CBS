import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import {  changeemail } from '../store/actions/user.actions';

export default function EditProfileScreen() {

    const user =useSelector((state: RootState) => state.user.loggedInUser);
    const [textEmail, setTextEmail] = useState(user?.email)
    const [emailValid, setEmailValid] = useState(false); // lift up - pass through props instead
    //textEmail->read   setTextEmail->write  false->state value

/*
We lift up state to a common ancestor of components that need it, so that they can all share in the state.
 This allows us to more easily share state among all of these components that need rely upon it.
*/


    const dispatch = useDispatch();

    // lifted up to this parent component.
    const navigation = useNavigation();

    const onSave = () => {
        if (emailValid) {
            // dispatch a redux action to save the new user obj.
            user.email = textEmail;
            navigation.goBack();
            dispatch<any>(changeemail(textEmail)); // dispatching a redux action.
            console.log("Changed");
        } 
    };

    // console.log(user.email);


    return (
        
        <View style={styles.container}>
            <List.Item
            title={''}
            left={()=><Avatar.Image source={require("../assets/pp.png")} size={150}/>}
            />
            <Input title="Update Email"
            error="Email cannot be empty"
            inputValue={textEmail}
            setText={setTextEmail}
            nameValid={emailValid}
            onValid={ (valid: any) => setEmailValid(valid)}
            />
            <Button title="Save" onPress={onSave} />

        

            
      
                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

