import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

function HomeScreen() {
    return (
        <View>
            <Text style={styles.text}>Home Screen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        paddingTop: 100
    }
})
