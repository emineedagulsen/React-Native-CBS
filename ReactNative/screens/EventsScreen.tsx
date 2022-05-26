import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text,Image, TouchableOpacity, View, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function EventsScreen() {   
    return (
        <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imageStyle} 
        source={require("../assets/yoga.png")}/>
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>Christmas with CBS Yoga</Text>
          <Text style={styles.categoryStyle}>CBS Yoga </Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
        }}><Ionicons name="time-sharp" size={24} text ="MON" color="black" />
        <Text style={{
            fontSize: 16,
            color: "black"
        }}>MON,1.APR-15.00-18.00</Text>
          </View>
        

          <View style={{
            flexDirection: "row",
            alignItems: "center"
        }}><Entypo name="location-pin" size={24} color="black" />
        <Text style={{
            fontSize: 14,
            color: "black"
        }}>Dalgas Have,2000 Frederiksberg</Text>
          </View>








          
        </View>
      </View>
    </View>
      );

  }
  const deviceWidth = Math.round(Dimensions.get('window').width);
  const offset = 40;
  const radius = 20;
  const styles = StyleSheet.create({
    container: {
      width: deviceWidth - 20,
      alignItems: 'center',
      marginTop: 25,
    },
    cardContainer: {
      width: deviceWidth - offset,
      backgroundColor: '#a29bfe',
      height: 280,
      borderRadius: radius,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 9,
    },
    imageStyle: {
      height: 180,
      width: deviceWidth - offset,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      opacity: 0.9,
      alignContent: 'center',
      alignSelf: 'center',
    },
    titleStyle: {
      fontSize: 20,
      fontWeight: '600',
    },
    categoryStyle: {
      fontWeight: '400',
    },
    infoStyle: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
  });