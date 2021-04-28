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

const log = () => {
    console.log('Press the button')
}

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            {list.map((item, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    {/* <ListItem.Chevron /> */}
                    <Icon name='description' onPress={log} />
                </ListItem>
            ))
            }
        </View>
    )
}

export default HomeScreen
