import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';



const Input = ({ title, inputValue, error, setText,nameValid ,onValid}:
    { title: string, inputValue: string, error: string, setText: (i: string) => void ,nameValid:boolean,onValid: (i: boolean) => void }) => {

    const [entered, setEntered] = useState(false)

    const handleChangeText = (input: string) => {
        setText(input);
        setEntered(true);
        input === '' ? onValid(false) : onValid(true);

    }

    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <TextInput value={inputValue} onChangeText={handleChangeText} onBlur={() => setEntered(true)} />

            {!nameValid && inputValue === '' && entered ? <Text>{error}</Text> : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
})

export default Input;