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

const Home = ({ navigation, route }) => {
    const { userId, apiName, path, jsonObj, projectId } = route.params

    return (<View style={styles.homeContainer}>
        {list.map((item, i) => (<TouchableOpacity
            key={i}
            activeOpacity={0.5}
            style={styles.gridBox}
            onPress={() => {
                switch (item.title) {
                    case 'Background':
                        navigation.navigate('Background', { userId: userId, apiName: apiName, path: path, screenName: 'background', jsonObj: jsonObj, projectId: projectId });
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

export default Home
