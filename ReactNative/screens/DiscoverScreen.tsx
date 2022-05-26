import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View ,Image, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function DiscoverScreen({navigation}: {navigation: any}) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);



    return (
    <><Searchbar
        onPressIn={() => navigation.navigate('Home')}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery} />


          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Event')}>
              <ImageBackground
                style={styles.coverImage}
                borderRadius={80}
                source={require("../assets/images.png")}
              >
                <View style={styles.textView}>
                  <Text style={styles.imageText}>ALL EVENTS</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>


            
            <View style={styles.container}>
            <ImageBackground
              style={styles.coverImage}
              borderRadius={80}
              source={require("../assets/organization.png")}
            >
              <View style={styles.textView}>
                <Text style={styles.imageText}>ALL ORGANIZATIONS</Text>
              </View>
            </ImageBackground>



            <ImageBackground
              style={styles.coverImage}
              borderRadius={80}
              source={require("../assets/post.png")}
            >
              <View style={styles.textView}>
                <Text style={styles.imageText}>ALL POSTS</Text>
              </View>
            </ImageBackground>
          </View>




          </View></>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    

  },
  coverImage: {
    width: '99%',
    height: 180,
    opacity:0.7,
    

  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity:0.7,
    

  },
  imageText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    
  },
});