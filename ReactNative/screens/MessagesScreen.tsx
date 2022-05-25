import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMessages, usePostMessage } from '../hooks/todos';
import { useQueryClient } from 'react-query';
import { GiftedChat } from 'react-native-gifted-chat';


export default function MessagesScreen() {

    const queryClient = useQueryClient();

    const [message, setMessage] = React.useState('');

    const chatmes = useSelector((state: any) => state.chat.chatmes);
    const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
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

                <Text>{chatmes.user}</Text>
            <Text>{chatmes.message}</Text>

            <FlatList
                data={messages}
                renderItem={mesaggesfromdata}/>
            <TextInput
                onChangeText={setMessage}
                value={message}
                placeholder="New Message"
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
        margin:5

    }
})  