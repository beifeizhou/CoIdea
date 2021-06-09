import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Header, Button, Icon } from 'react-native-elements'
import Amplify from '@aws-amplify/core';
import awsmobile from '../src/aws-exports';
import { API } from 'aws-amplify';

Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true
    }
});

const Content = ({ navigation, route }) => {
    const { userId, apiName, path, screenName, projectId } = route.params
    const myInit = {}
    const [text, setText] = useState('')
    const [editable, setEditable] = useState(true)
    const [jsonObj, setJsonObj] = useState(
        {
            user_id: null,
            info: {
                email: null,
                projects: []
            }
        }
    )

    useEffect(() => {
        API.get(apiName, path, myInit)
            .then(res => {
                if (res != null) {
                    setJsonObj(res)
                    console.log(res)
                }
            })
    }, [])
    const project = jsonObj['info']['projects'].filter((proj) => proj.project_id == projectId)[0]
    console.log('Start to print project')
    console.log(JSON.stringify(project))

    useEffect(() => {
        if (screenName in project) { setText(project[screenName]) }
    }, [jsonObj])

    const toggle = () => {
        setEditable(!editable);
    };

    const saveText = (text) => {
        setText(text)
        project[screenName] = text
        const rest = jsonObj['info']['projects'].filter((proj) => proj.project_id != projectId)
        const newProjects = [...rest, project]
        jsonObj['projects'] = newProjects
        const myInit = {
            'body': jsonObj['info']
        }

        console.log(myInit)

        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setEditable(!editable)
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                let button = editable ?
                    <Icon name='edit' style={styles.icon} onPress={toggle} /> :
                    <Icon name='done' style={styles.icon} onPress={() => saveText(text)} />
                return button;
            }
        })
    }, [editable, text])

    // Textinput needs to be modified
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {editable ?
                    <Text style={styles.text} autoFocus multiline={true}>{text}</Text> :
                    <TextInput value={text}
                        onChangeText={setText}
                        autoFocus
                        multiline={true}
                        returnKeyType="next"
                        style={styles.text}
                    >
                    </TextInput>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        // padding: 2,
    },
    text: {
        flex: 1,
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