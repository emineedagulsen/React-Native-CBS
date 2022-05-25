import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { RefreshControl,Button, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Divider, List, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/user.actions';
import { StackParamList } from '../typings/navigations';
import { RootState } from '../App';

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default function ProfileScreen() {
    const navigation = useNavigation<ScreenNavigationType>();
    const dispatch = useDispatch();
    const user =useSelector((state: RootState) => state.user.loggedInUser);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
    
    return (
        <><SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}
            >
            </ScrollView>
        </SafeAreaView><><><View style={styles.a} /><Avatar.Image source={require("../assets/pp.png")}  size={150} /><Title>{user.email}</Title><View /></><><View style={styles.container} /><Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} /><Button title="Logout" onPress={() => dispatch(logout())} /><View /></></></>
         
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:400,
    },
    a:{
        
        marginTop:-170,
        
    },
    button: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#4A209C",
      },
})