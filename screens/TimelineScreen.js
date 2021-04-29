import React from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { View, StyleSheet } from 'react-native'

const placeholders = [
    { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
    { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
    { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
    { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
    { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
]

const TimelineScreen = () => {
    return (
        <Timeline data={placeholders}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
            descriptionStyle={{ color: 'gray' }}
            options={{
                style: {
                    paddingTop: 20,
                    paddingLeft: 20,
                }
            }}
        >
        </Timeline>
    )
}

export default TimelineScreen;