import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Header, Button, Icon } from 'react-native-elements'
import { set } from 'react-native-reanimated'

const Background = ({ navigation }) => {
    const [text, setText] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/background')
            .then(res => { return res.json() })
            .then(text => { setText(text.text) })
    }, [])

    const [editable, setEditable] = useState(true)
    const toggle = () => {
        setEditable(!editable);
    };

    const saveText = (text) => {
        const textObj = { "text": text }
        fetch('http://localhost:5000/background', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(textObj)
        })
        setEditable(!editable)
    }

    // Textinput needs to be modified 
    return (
        <View style={styles.view}>
            {editable ? <Icon name='edit' onPress={toggle} /> : <Icon name='save' onPress={() => saveText(text)} />}
            {editable ?
                <Text style={styles.text} onPress={toggle}>{text}</Text> :
                <TextInput value={text}
                    onChangeText={setText}
                    autoFocus
                    multiline={true}
                    returnKeyType="next"
                    style={styles.text}
                >
                </TextInput>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
    },
    text: {
        height: '80%'
    }
})

export default Background;