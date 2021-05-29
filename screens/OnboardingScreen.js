import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Header } from 'react-native-elements'

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Projects")}
            onDone={() => navigation.replace("Projects")}
            imageContainerStyles={{ paddingTop: 0, flex: 0.5, justifyContent: 'flex-end', }}
            pages={
                [
                    {
                        backgroundColor: '#fff',
                        image: <Image style={styles.image} source={require('../assets/logo.png')} />,
                        title: 'CoIdea',
                        subtitle: 'Write your idea collaboratively',
                    }
                ]}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    }
})

export default OnboardingScreen;
