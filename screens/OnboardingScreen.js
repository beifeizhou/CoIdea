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

const OnboardingScreen = () => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            imageContainerStyles={{ paddingTop: 0, flex: 0.6, justifyContent: 'flex-end', }}
            pages={
                [
                    {
                        backgroundColor: '#fff',
                        image: <Image style={styles.image} source={require('../assets/logo.png')} />,
                        title: 'CoIdea',
                        subtitle: 'Write your idea collaboratively',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={styles.image} source={require('../assets/logo.png')} />,
                        title: 'How it works',
                        subtitle: 'Background, timeline, research, roadmap',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={styles.image} source={require('../assets/logo.png')} />,
                        title: 'How it works',
                        subtitle: 'Background, timeline, research, roadmap',
                    },

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
