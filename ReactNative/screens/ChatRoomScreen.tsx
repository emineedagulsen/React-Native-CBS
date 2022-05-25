import React, { useEffect, useState } from 'react';
import {  FlatList, StyleSheet, Text, TouchableOpacity, View,TextInput, Button, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatrooms, addChatroom,write_data } from '../store/actions/chat.actions';
import { Chatroom, Status } from '../entities/Chatroom';
import { Icon } from 'react-native-elements'
import Dialog from "react-native-dialog";
import { Divider, List } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default function ChatRoomScreen({navigation}: {navigation: any}) {
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [status, setstatus] = useState('');
    
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
      setVisible(true);
    };
  
    const Cancel = () => {
      setVisible(false);
    };
  
   








    useEffect(() => { 
        dispatch<any>(fetchChatrooms())

    }, [])

    const CreateChatroom = () => {
        const chatroom: Chatroom = new Chatroom(user, Status.UNREAD, message, new Date());
        dispatch<any>(addChatroom(chatroom));
        setUser('');
        setMessage('');
        setstatus('');
        setVisible(false);
        
    }
    const DesignChatroom = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => Message(item)}
            style={styles.z}>
            
            <View style={styles.flatview}>
                <Text style={styles.name} >{item.user} </Text>
                
            </View>
            <View style={styles.t}>
            <Text style={styles.message}>{item.message}</Text>

            </View>
            <View style={styles.p}>
            <Text style={styles.status}>{item.status}</Text>

            </View>

            <Divider></Divider>

        </TouchableOpacity>
    );
    

    const Message = ( item :Chatroom) => {
        navigation.navigate("Messages");
        dispatch<any>(fetchChatrooms());
        dispatch<any>(write_data(item));

    }

  

    return (
        <><SafeAreaView style={styles.scroll}>
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}
            >
            </ScrollView>
        </SafeAreaView><View style={styles.container}>
                <FlatList
                    data={chatrooms}
                    renderItem={DesignChatroom} />
                <Icon
                    reverse
                    name='ios-add'
                    type='ionicon'
                    color='#517fa4'
                    onPress={showDialog} /><Dialog.Container visible={visible}>

                    <Dialog.Title>New Chat</Dialog.Title>
                    <Divider></Divider>
                    <TextInput

                        onChangeText={setUser}
                        value={user}
                        placeholder="Enter user name:" />
                    <Divider></Divider>
                    <TextInput
                        onChangeText={setMessage}
                        value={message}
                        placeholder="Message:" />
                    <Dialog.Button label="Cancel" onPress={Cancel} />
                    <Dialog.Button label="Add" onPress={CreateChatroom} />
                </Dialog.Container>

            </View></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    x: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    y: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    z: {
        flexDirection: 'row',
        width:"100%",
        justifyContent:"space-between"
    },
    t: {
        flexDirection: 'row',
        justifyContent:"space-between",
        width:"20%",
        height:'100%'
    },
    p: {
        flexDirection: 'row',
        justifyContent:"space-between",
        width:"20%",
        height:'100%'
    },
    status:{
        color: 'red'

    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 22
    },
    message: {
        color: 'black'
        
    },
    scroll:{
        width:390,
        height:70,
        backgroundColor:"white"
    },
    flatview: {
        justifyContent: 'space-between',
        paddingTop: 10,
        borderRadius: 4,
        flexDirection: 'row',


    }
})