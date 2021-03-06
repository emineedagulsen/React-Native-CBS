import React  from 'react';
import { StyleSheet, Text, View,Image, Alert, TouchableOpacity } from 'react-native';


export default function VerifiedEmailScreen({navigation}: {navigation: any}) {
    

    


    return (
        <View style={{flex: 1,backgroundColor: '#4f4fa6'}}>
            <Image style={styles.image} source={require("../assets/verified.png")}/>

            
            <TouchableOpacity style={styles.x}
                
            onPress={() => navigation.navigate('BeforeStart')} >
              <Text style={styles.color}>{"I've verified my email"}</Text>
        </TouchableOpacity>


            <TouchableOpacity style={styles.y}
                onPress={() => Alert.alert("A Short Title Is Best",
                "A massage should be a short,complete sentence.")}>
                  <Text style={styles.y}>{"Having  trouble? "}</Text>
                 
                    
            </TouchableOpacity>

            


        </View>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 370,
        height: 540,
        marginBottom:70,

    },
    y: {
        color: "white",
        alignItems: 'center',
        fontSize: 15,
        fontWeight: "bold"
    },
    z: {
        color: "white",
        alignItems: 'center',
        fontSize: 13,
        fontWeight: "normal"

    },
    color: {
        color: "black",
        alignItems: 'center',
        fontSize: 13,
        fontWeight: "normal"

    },
    x: {
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#fff",
    }
}) 