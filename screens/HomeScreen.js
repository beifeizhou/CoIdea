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
        iconImage: require('../assets/beijing.png')
    },
    {
        title: 'Timeline',
        icon: 'timeline',
        iconImage: require('../assets/shijianzhou.png')
    },
    {
        title: 'Research',
        icon: 'lightbulb',
        iconImage: require('../assets/yanjiu.png')
    },
    {
        title: 'Roadmap',
        icon: 'star',
        iconImage: require('../assets/luxiantu-2.png')
    }
]

Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true
    }
});

const HomeScreen = ({ navigation, route }) => {
    const apiName = 'codieapy'
    const myInit = {}
    const [userId, setUserId] = useState(null)
    const [checkUser, setCheckUser] = useState(null)
    const [jsonObj, setJsonObj] = useState(
        {
            user_id: null,
            info: {
                email: null,
                projects: []
            }
        }
    )
    const [project, setProject] = useState(
        {
            project_id: null,
            project_name: null,
            is_mine: null,
            background: null,
            research: null,
            roadmap: null,
            events: []
        }
    )


    useEffect(() => {
        API.get(apiName, path, myInit)
            .then(res => {
                if (res != null) {
                    setJsonObj(res)
                    setProject(res['info']['projects'].filter((proj) => proj.project_id == projectId)[0])
                }
            })
    }, [])

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

    useEffect(() => {
        console.log(project.project_name)
        navigation.setOptions(title = project.project_name)
    }, [project])

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
