import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Header, Button, Icon } from 'react-native-elements'
import { set } from 'react-native-reanimated'
import Amplify, { JS } from '@aws-amplify/core';
import awsmobile from '../src/aws-exports';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true
    }
});

const Content = ({ navigation, route }) => {
    console.log(JSON.stringify(route.params))
    const { userId, apiName, path, screenName } = route.params
    const myInit = {}
    const [text, setText] = useState('')
    const [editable, setEditable] = useState(true)
    const toggle = () => {
        setEditable(!editable);
    };

    console.log(screenName)
    useEffect(() => {
        API.get(apiName, path, myInit).then(res => { console.log(res); console.log(res[screenName]); setText(res[screenName]) })
    }, [])

    const saveText = (text) => {
        const myInit = {
            'body': {
                'user_id': userId,
                [screenName]: text
            }
        }

        console.log(myInit)

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

export default Content;