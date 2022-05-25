import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View ,Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function DiscoverScreen({navigation}: {navigation: any}) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);



    return (
    <><Searchbar
            onPressIn={() => navigation.navigate('Home')}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery} /><View style={styles.container}>
                <TouchableOpacity style={styles.container}>
                    <Text style={styles.title} >ALL EVENTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container}>
                    <Text style={styles.title} >ALL STUDENT ORGANIZATION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container}>
                    <Text style={styles.title} >ALL POSTS</Text>
                </TouchableOpacity>
            </View></>
  );
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
  });