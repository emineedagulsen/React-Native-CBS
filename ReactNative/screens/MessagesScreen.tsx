import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMessages, usePostMessage } from '../hooks/todos';
import { useQueryClient } from 'react-query';
import { Avatar } from 'react-native-paper';


export default function MessagesScreen() {

    const queryClient = useQueryClient();

    const [message, setMessage] = React.useState('');

    const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
    const Chat = useSelector((state: any) => state.chat.Chat);


    const { isLoading, isError, messages, error } = useGetMessages();
    const { mutate: createChatmessage } = usePostMessage()

     //save messages
    const Message = () => {
        const x = { title: message, user: loggedInUser }
        createChatmessage(x, { onSuccess: () => queryClient.invalidateQueries('chatmessages') })
    }
    

    const mesaggesfromdata = ({ item }: { item: any }) => (
        <View style={styles.mymessages} >
            <Text style ={styles.a}>{item.user.email}</Text>
            <Text style ={styles.a}>{item.title}</Text>
        </View>
    )
   
    return (
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


                <Button title="Send" onPress={Message} />
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