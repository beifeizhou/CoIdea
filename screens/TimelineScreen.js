import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Button, Icon } from 'react-native-elements'

// const placeholders = [
//     { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
//     { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
//     { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
//     { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
//     { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
// ]

const TimelineScreen = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => { return res.json() })
            .then(data => { setEvents(data) })
    }, [])

    const addEvent = () => {
        alert('You tapped the button!')
    }

    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        setTasks([...tasks, data])
    }

    return (

        <View style={styles.container}>

            <Icon name="add" color="blue" size='30' />
            <Timeline data={events}
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
        </View>
    )
}

export default TimelineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});