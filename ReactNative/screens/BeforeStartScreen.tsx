import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View ,Image, TouchableOpacity, SafeAreaView, ScrollView, Switch, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dialog } from 'react-native-elements';
import { User } from 'react-native-gifted-chat';
import { Avatar, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../App';

export default function BeforeStartScreen({navigation}: {navigation: any}) {

  const user = useSelector((state: RootState) => state.user.loggedInUser);


  const onPressDoSomething = () =>{
    Alert.alert(
      "'Student Life' would like to send you notifications",
        "You have to choose one of the options."      ,   
      [                      
        {
          text: "Don't allow",
          onPress: () =>navigation.navigate('Login')
        },
        {
          text: "Allow",
          onPress: () =>navigation.navigate('Login')
        },
      ],
    );
  }

    return (
      <View style={styles.container}>

        <Image style={styles.image} source={require("../assets/bws1.png")} />

        <TouchableOpacity style={styles.loginbutton}
        onPress={onPressDoSomething}>
          

          <Text style={styles.y}>{"Turn on notifications"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity style={styles.maybelater}
          onPress={() => navigation.navigate('Login')}>

          <Text style={styles.a}>{"Maybe later"}</Text>

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
      width: 300,
      height: 350,
    },
    loginbutton: {
      width: "70%",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      backgroundColor: "#4A209C",
    },
    maybelater: {
      width: "70%",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      backgroundColor: "#D3D3D3",
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
      fontSize: 17,
      fontWeight: "normal"        
    },

  });