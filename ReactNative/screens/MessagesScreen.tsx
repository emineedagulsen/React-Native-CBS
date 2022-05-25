import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMessages, usePostMessage } from '../hooks/todos';
import { useQueryClient } from 'react-query';


export default function MessagesScreen() {

    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [message, setMessage] = React.useState('');

    const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
        const openChat = useSelector((state: any) => state.chat.openChat);

    const { mutate: createChatmessage } = usePostMessage()

    const { isLoading, isError, messages, error } = useGetMessages();
    
     
   

    const mesaggesfromdata = ({ item }: { item: any }) => (
        <View style={styles.a}>
            
            <Text>{item.user.email}:</Text>
            <Text>{item.title}</Text>
        </View>
    )
    const Message = () => {
        const x = { title: message, user: loggedInUser }
        createChatmessage(x, { onSuccess: () => queryClient.invalidateQueries('chatmessages') })
    }
    
    return (
        <View style={styles.container}>

            <Text style={styles.textInputStyle}>
                {openChat.user}</Text>
            <Text style={styles.textInputStyle}>{openChat.message}</Text>

            <FlatList
                data={messages}
                renderItem={mesaggesfromdata}/>
            <TextInput
                onChangeText={setMessage}
                value={message}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={Message} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
        
    },
    
    a: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
        margin:5

    },
    textInputStyle: {
        backgroundColor: 'pink',
        width:"30%",
        borderRadius: 100,

        }
})  