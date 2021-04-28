import React from 'react'
import { View, Text } from 'react-native'
import { Header } from 'react-native-elements'

const Background = ({ navigation }) => {
    return (
        <View>
            <Header>Background</Header>
            <Button
                title="Background"
                onPress={() => navigation.push('Background')}
            />
        </View>
    )
}

export default Background;