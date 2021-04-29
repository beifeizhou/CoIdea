import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, ListItem, Icon, Button, Card } from 'react-native-elements'

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

const clickNav = ({ title, navigation }) => {
    switch (title) {
        case "Background":
            navigation.navigate('Background');
            break;
        default:
            navigation.navigate('Background');
    }
}

const clickNavTest = ({ navigation }) => { navigation.navigate('Background') }


const HomeScreen = ({ navigation }) => {
    return (
        <View>
            {list.map((item, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <Icon name='description'
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
                        }} />
                </ListItem>))}
        </View>
    )
}

export default HomeScreen
