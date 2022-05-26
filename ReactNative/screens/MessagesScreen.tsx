import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMessages, usePostMessage } from '../hooks/todos';
import { useQueryClient } from 'react-query';
import { Avatar } from 'react-native-paper';


export default function MessagesScreen() {
//create client
    const queryClient = useQueryClient();

    const [message, setMessage] = React.useState('');

    const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
    const Chat = useSelector((state: any) => state.chat.Chat);

    //Use it in the page. Get 
    const { isLoading, isError, messages, error } = useGetMessages();
    


    //Use it in the page Post
    const { mutate: createChatmessage } = usePostMessage()
    //Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects.
    // For this purpose, React Query exports a useMutation hook.
    //I used it there for creating a new message



     //save messages
    const HandleAddMessages = () => {
        const x = { title: message, user: loggedInUser }
        createChatmessage(x, { onSuccess: () => queryClient.invalidateQueries('chatmessages') })
        //When a successful postMessage mutation happens,
        //all messages queries to get invalidated and possibly refetched to show the new message.
        // pass in chatmessages as the key
    }
    
    //my messages which send after create chatroom
    const mesaggesfromdata = ({ item }: { item: any }) => (
        <View style={styles.mymessages} >
            <Text style ={styles.a}>{item.user.email}</Text>
            <Text style ={styles.a}>{item.title}</Text>
        </View>
    )
    /*
   FlatList data=messages array are from hook
   renderItem: user's messages  
   */
    return (
        //other user's messages (what we add from start)
        <><View style={styles.textInputStyle}>
            <Text>{Chat.user}</Text>
            <Text>{Chat.message}</Text>
        </View><View style={styles.container}>
                <FlatList
                    data={messages}
                    renderItem={mesaggesfromdata} />

                <TextInput
                    onChangeText={setMessage}
                    value={message}
                    placeholder="          Write a message" 
                    /><Avatar.Image size={30} source={require('../assets/pp.png')} />


                <Button title="Send" onPress={HandleAddMessages} />
            </View></>
            
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        
    },
    mymessages:{
        alignItems:'flex-end',
        
    },
    a: {
        backgroundColor: '#E1F8DC',
        width:"40%",
        borderRadius: 100,
        alignItems: 'center',
        

    },
    textInputStyle: {
        backgroundColor: 'pink',
        width:"40%",
        borderRadius: 100,
        
    },
    avatar:{
        height:10,

    }
})  