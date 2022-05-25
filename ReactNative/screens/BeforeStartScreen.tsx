import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View ,Image, TouchableOpacity, SafeAreaView, ScrollView, Switch} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { User } from 'react-native-gifted-chat';
import { Avatar, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../App';

export default function BeforeStartScreen({navigation}: {navigation: any}) {

  const [isEnabled, setIsEnabled] = useState(false);
  const user = useSelector((state: RootState) => state.user.loggedInUser);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);


    return (
      <View style={styles.container}>

        <Image style={styles.image} source={require("../assets/resim.png")} />
        <Text style={styles.title}>Before we start...</Text>

        <TouchableOpacity style={styles.loginbutton}>

          <Text style={styles.y}>{"UPLOAD"}</Text>
        
        </TouchableOpacity>
           

      </View>
    )
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        
        alignItems: 'center',
        padding: 10,
        margin: 80,
        height: 50,
        width: 50,
        opacity: 0.7,

      },
      title: {
        fontSize: 13,
        color: "black",
        marginBottom: 20,
        fontWeight: "400",
    },
    image:{
      width: 150,
      height: 120,
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
    box:{
      width: "70%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      backgroundColor: "#B2BEB5",

    },
    y: {
      color: "white",
      marginBottom: 5,
      padding: 5,
      fontSize: 16,
      fontWeight: "normal"        
    },
    a: {
      color: "black",
      marginBottom: 5,
      padding: 5,
      fontSize: 16,
      fontWeight: "normal"        
    },

  });