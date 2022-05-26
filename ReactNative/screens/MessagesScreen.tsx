import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMessages, usePostMessage } from '../hooks/todos';
import { useQueryClient } from 'react-query';
import { Avatar } from 'react-native-paper';


export default function MessagesScreen() {

    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [message, setMessage] = React.useState('');

    const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
    const Chat = useSelector((state: any) => state.chat.Chat);

    const { mutate: createChatmessage } = usePostMessage()

    const { isLoading, isError, messages, error } = useGetMessages();
    
     
   

    const mesaggesfromdata = ({ item }: { item: any }) => (
        <View style={styles.a} >
            <Text>{item.user.email}</Text>
            <Text>{item.title}</Text>
        </View>
    )
    const Message = () => {
        const x = { title: message, user: loggedInUser }
        createChatmessage(x, { onSuccess: () => queryClient.invalidateQueries('chatmessages') })
    }
    
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
        backgroundColor: 'white',
        
        
    },
    
    a: {
        backgroundColor: 'pink',
        width:"40%",
        borderRadius: 100,
        

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