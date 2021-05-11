import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, ListItem, Icon, Button, Card } from 'react-native-elements'
import Amplify from '@aws-amplify/core';
import awsmobile from '../src/aws-exports';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

const list = [
    {
        title: 'Background',
        icon: 'note',
    },
    {
        title: 'Timeline',
        icon: 'timeline',
    },
    {
        title: 'Research',
        icon: 'lightbulb',
    },
    {
        title: 'Roadmap',
        icon: 'star'
    }
]

Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true
    }
});

const HomeScreen = ({ navigation }) => {
    const apiName = 'codieapy'
    const myInit = {}
    const [userId, setUserId] = useState(null)
    useEffect(() => {
        Auth.currentUserInfo()
            .then((data) => { setUserId(data.id) })
            .catch(error => console.log(`Error: ${error.message}`));
    })
    const path = `/users/${userId}/background`

    const [checkUser, setCheckUser] = useState(false)

    API.get(apiName, path, myInit)
        .then(response => { if (response != null) { console.log(response); setCheckUser(true) } })
        .catch(error => {
            console.log(error.response);
        });

    if (!checkUser) {
        API.put(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
    }

    return (
        <View>
            {list.map((item, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron onPress={() => {
                        switch (item.title) {
                            case 'Background':
                                navigation.navigate('Background');
                                break;
                            case 'Timeline':
                                navigation.navigate('TimelineScreen');
                                break;
                            default:
                                navigation.navigate('Demo');
                        }
                    }}
                    />
                </ListItem>))}
        </View>
    )
}

export default HomeScreen
