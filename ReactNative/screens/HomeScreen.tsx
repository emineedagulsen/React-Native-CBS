import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../typings/navigations';
import EventsScreen from './EventsScreen';

export default function HomeScreen() {
    const Stack = createNativeStackNavigator<StackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Event" component={EventsScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})