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

