import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View ,Image, TouchableOpacity, Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { rehydrateUser, signin } from '../store/actions/user.actions';

export default function LoginScreen({navigation}: {navigation: any}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
 



    const dispatch = useDispatch();

    async function readPersistedUserInfo() {
        const token = await SecureStore.getItemAsync('idToken');
        const userJson = await SecureStore.getItemAsync('user');
        let user = null;
        if (userJson) {
            user = JSON.parse(userJson);
        }
        if (user) {
            // then we have a priv. login
            // restore the signup by updating the redux store based on usre and token.
            dispatch(rehydrateUser(user, token!))
        }
    }

    useEffect(() => {
        readPersistedUserInfo();
    }, [])


    return (
        <View style={styles.container}>
             <Image style={styles.image} source={require("../assets/resim.png")} />
            <Text style={styles.y}>Log in</Text>

            <TextInput value={email}  placeholder="Email"  onChangeText={setEmail}
                style={styles.input}  />
                
            <TextInput value={password} placeholder="Password" onChangeText={setPassword} style={styles.input} 
            secureTextEntry/>
            
          

            <TouchableOpacity style={styles.loginbutton}
             onPress={() => dispatch<any>(signin(email, password))} >
                  <Text style={styles.x}>{"Login"}</Text>
            </TouchableOpacity>
            
            


           
            
            <Text style={styles.acc_button}>Don't you have an account?</Text>
            
            <Button title="Sign up" onPress={() => navigation.navigate('NewUser')}/> 
            
        </View>
    ); 
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        color: "#fff",
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        marginBottom: 40,
        backgroundColor: "#FFFDFD",
        padding: 10,
        width: "89%",
        marginTop: 1,
        color: "#000",
    },

    x: {
        color: "white",
        marginBottom: 1,
        padding: 1,
        fontSize: 18,
        fontWeight: "normal"        
      },
      y: {
        color: "black",
        marginBottom: 1,
        padding: 1,
        fontSize: 18,
        fontWeight: "bold"        
      },
    image:{
        width: 150,
        height: 120,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  acc_button: {
    height: 20,
    marginBottom: 8,

  },
  loginbutton: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#4A209C",
  },
})