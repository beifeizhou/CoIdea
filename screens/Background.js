import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Header, Button, Icon } from 'react-native-elements'
import { set } from 'react-native-reanimated'
import Amplify from '@aws-amplify/core';
import awsmobile from '../src/aws-exports';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true
    }
});

const Background = ({ navigation }) => {
    const apiName = 'codieapy'
    const myInit = {}
    const [userId, setUserId] = useState(null)
    const [text, setText] = useState('')
    useEffect(() => {
        Auth.currentUserInfo()
            .then((data) => { setUserId(data.id) })
            .catch(error => console.log(`Error: ${error.message}`));
    })
    const path = `/users/${userId}/background`

    const [checkUser, setCheckUser] = useState(false)
    useEffect(() => {
        API.get(apiName, path, myInit)
            .then(response => {
                if (response != null) {
                    console.log(response)
                    setCheckUser(true)
                    if (response.hasOwnProperty('background')) {
                        setText(response.background)
                    }
                }
            })
            .catch(error => {
                console.log(error.response);
            });
    }, [])

    // if (!checkUser) {
    //     API.put(apiName, path, myInit)
    //         .then(response => { console.log(response) })
    //         .catch(error => {
    //             console.log(error.response);
    //         })
    // }




    // const [text, setText] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:5000/background')
    //         .then(res => { return res.json() })
    //         .then(text => { setText(text.text) })
    // }, [])

    const [editable, setEditable] = useState(true)
    const toggle = () => {
        setEditable(!editable);
    };

    // const saveText = (text) => {
    //     const textObj = { "text": text }
    //     fetch('http://localhost:5000/background', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify(textObj)
    //     })
    //     setEditable(!editable)
    // }

    const saveText = (text) => {
        const myInit = {
            'body': {
                'user_id': userId,
                'background': text
            }
        }

        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setEditable(!editable)
    }

    // Textinput needs to be modified 
    return (
        <View style={styles.view}>
            {editable ?
                <Icon name='edit' style={styles.icon} onPress={toggle} /> :
                <Icon name='done' style={styles.icon} onPress={() => saveText(text)} />
            }
            {editable ?
                <Text style={styles.text}>{text}</Text> :
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
        padding: 2,
    },
    text: {
        height: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 18

    },
    icon: {
        alignSelf: 'flex-end'
    }
})

export default Background;