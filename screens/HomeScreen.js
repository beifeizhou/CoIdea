import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, ListItem, Icon, Button, Card } from 'react-native-elements'
import Amplify from '@aws-amplify/core';
import awsmobile from '../src/aws-exports';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { set } from 'react-native-reanimated';

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
            .catch(error => console.log(`Error: ${error.message}`))
    }, [])
    const path = `/users/${userId}/background`

    useEffect(() => {
        if (userId != null) {
            console.log(userId)
            API.get(apiName, path, myInit)
                .then(res => {
                    if (res != null) {
                        console.log(res)
                        setCheckUser(true)
                    } else {
                        console.log(res)
                        setCheckUser(false)
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }, [userId])

    useEffect(() => {
        if (userId != null && !checkUser) {
            console.log('start to put')
            API.put(apiName, path, myInit)
                .then(res => { console.log(res) })
                .catch(error => {
                    console.log(error.response);
                })

        }
    }, [checkUser])

    console.log(userId)
    console.log(path)

    return (<View style={styles.homeContainer}>
        {list.map((item, i) => (<TouchableOpacity
            key={i}
            activeOpacity={0.5}
            style={styles.gridBox}
            onPress={() => {
                switch (item.title) {
                    case 'Background':
                        navigation.navigate('Background', { userId: userId, apiName: apiName, path: path, screenName: 'background' });
                        break;
                    case 'Timeline':
                        navigation.navigate('TimelineScreen', { userId: userId, apiName: apiName, path: path });
                        break;
                    case 'Research':
                        navigation.navigate('Research', { userId: userId, apiName: apiName, path: path, screenName: 'research' });
                        break;
                    case 'Roadmap':
                        navigation.navigate('Roadmap', { userId: userId, apiName: apiName, path: path, screenName: 'roadmap' });
                        break;

                }
            }}
        >
            <Image source={item.iconImage} style={styles.iconImage}></Image>
            <Text>{item.title}</Text>
        </TouchableOpacity>))}
    </View>)
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

export default HomeScreen
