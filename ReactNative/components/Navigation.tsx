import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewUserScreen from '../screens/NewUserScreen';
import EventsScreen from '../screens/EventsScreen';



import { StackParamList } from "./../typings/navigations";


import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import VerifiedEmailScreen from '../screens/VerifiedEmailScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import BeforeStartScreen from '../screens/BeforeStartScreen';
import MessagesScreen from '../screens/MessagesScreen';


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function ChatStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={ChatRoomScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />

        </Stack.Navigator>
    );
}
function DiscoverStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Discover" component={DiscoverScreen} />
            <Stack.Screen name="Event" component={EventsScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>
    );
}

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            
        </Stack.Navigator>
    )
}

export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)

    return (
        <NavigationContainer>
            {/* Move navigation related code to a seperate component that is used here */}
            {/* Determine if the user is logged in and display:
        A stack navigator (only) with signup and login
        Our "normal" app with tabs navigation */}
            {user !== null ? (
                // Show the app with all navigation
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Home') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                         return <Octicons name="home" size={24} color="black" />
                      } else if (route.name === 'Chat') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                       return  <Ionicons name="md-chatbox-outline" size={24} color="black" />
                      } else if (route.name === 'Menu') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                       return <SimpleLineIcons name="menu" size={24} color="black" />
                      }
                      else{
                       return  <AntDesign name="search1" size={24} color="black" />
                      }
                      // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    
                  })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />

                    <Tab.Screen name="Discover" component={DiscoverStackNavigator}
                    
                    />
                    {/* <Tab.Screen name="Discover" component={DiscoverScreen} /> */}
                    <Tab.Screen name="Chat" component={ChatStackNavigator}
                        options={{ tabBarBadge: 3 }} 
                    
                    />
                    <Tab.Screen name="Menu" component={ProfileStackNavigator} />
                </Tab.Navigator>
            ) : (
                
                // show a stack navigator with only signup and login screens.
                <Stack.Navigator>
                     <Stack.Screen name="Login" component={LoginScreen} /> 

                     <Stack.Screen name="NewUser" component={NewUserScreen} />
                     <Stack.Screen name="VerifiedEmail" component={VerifiedEmailScreen} />
                     <Stack.Screen name="BeforeStart" component={BeforeStartScreen} />

                </Stack.Navigator>
            )}
        </NavigationContainer>
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