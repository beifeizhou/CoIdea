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
        iconImage: require('../src/asserts/beijing.png')
    },
    {
        title: 'Timeline',
        icon: 'timeline',
        iconImage: require('../src/asserts/shijianzhou.png')
    },
    {
        title: 'Research',
        icon: 'lightbulb',
        iconImage: require('../src/asserts/yanjiu.png')
    },
    {
        title: 'Roadmap',
        icon: 'star',
        iconImage: require('../src/asserts/luxiantu-2.png')
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
    const [checkUser, setCheckUser] = useState(null)
    useEffect(() => {
        Auth.currentUserInfo()
            .then((data) => { setUserId(data.id); console.log(userId) })
            .catch(error => console.log(`Error: ${error.message}`));
    })
    const path = `/users/${userId}/background`
    console.log(path)

    if (userId != null) {
        API.get(apiName, path, myInit)
            .then(response => { if (response != null) { setCheckUser(true) } })
            .catch(error => {
                console.log(error.response);
            });
    }

    if (checkUser != null && !checkUser) {
        API.put(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
    }

    return (
        <View >
            {list.map((item, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron onPress={() => {
                        switch (item.title) {
                            case 'Background':
                                navigation.navigate('Background', { userId: userId, apiName: apiName, path: path });
                                break;
                            case 'Timeline':
                                navigation.navigate('TimelineScreen', { userId: userId, apiName: apiName, path: path });
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

// 新界面
const HomeScreen2 = ({ navigation }) => {
    return (<View style={styles.homeContainer}>
        {list.map((item, i) => (<TouchableOpacity
            key={i}
            activeOpacity={0.5}
            style={styles.gridBox}
            onPress={() => {
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
        >
            <Image source={item.iconImage} style={styles.iconImage}></Image>
            <Text>{item.title}</Text>
        </TouchableOpacity>))}
    </View>)
}

const styles = StyleSheet.create({
    homeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    iconImage: {
        width: 46,
        height: 46,
        marginBottom: 12
    },
    gridBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '44.4%',
        minHeight: 184,
        aspectRatio: 1,
        marginTop: 16,
        marginLeft: '3.9%',
        backgroundColor: "#ffffff",
        borderRadius: 12
    }
})

export default HomeScreen2
