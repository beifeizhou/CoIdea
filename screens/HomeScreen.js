import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, ListItem, Icon, Button, Card } from 'react-native-elements'

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
