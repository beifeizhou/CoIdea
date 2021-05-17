import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { View, StyleSheet, TextInput, Alert } from 'react-native'
import { Button, Icon, Overlay, Input, Text } from 'react-native-elements'
import { v4 as uuidv4 } from 'uuid'
import { event } from 'react-native-reanimated'
import Amplify from '@aws-amplify/core';
import awsmobile from '../src/aws-exports';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

const TimelineScreen = ({ navigation, route }) => {
    const { userId, apiName, path, events } = route.params
    const myInit = {}
    const [myEvents, setMyEvents] = useState(events)


    const [time, onChangeTime] = useState('')
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('')
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [eventVisible, setEventVisible] = useState(false)
    const toggleEventOverlay = (event) => {
        console.log(eventVisible)
        setEventVisible(!eventVisible);
        console.log(eventVisible)
    };

    // Add event
    const addEvent = (time, title, description) => {
        const newEvent = {
            "id": uuidv4(),
            "time": time,
            "title": title,
            "description": description
        }
        fetch('http://localhost:5000/events', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newEvent)
        })
        setEvents([...events, newEvent])
        setVisible(!visible)
    }

    // Add event via api
    const addEventApi = (time, title, description) => {
        const newEvent = {
            "id": uuidv4(),
            "time": time,
            "title": title,
            "description": description
        }
        const added = [...myEvents, newEvent]
        const myInit = {
            'body': {
                'user_id': userId,
                'events': added
            }
        }

        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setMyEvents(added)
        setVisible(!visible)
    }

    const deleletEvent = (id) => {
        fetch(`http://localhost:5000/events/${id}`, { method: 'DELETE' })
        setEvents(events.filter((each) => each.id != id))
    }

    const editDelete = (event) => {
        const id = event.id
        Alert.alert(
            "Edit or delete this event",
            "",
            [
                { text: "Edit", onPress: () => console.log('todo'), },
                { text: "Delete", onPress: () => deleletEvent(id) },
                { text: "Cancel", style: 'cancel' }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Icon name="add" color="#000000" size={30} onPress={toggleOverlay} />
            <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay} >
                <Input placeholder='Time'
                    onChangeText={onChangeTime}
                    value={time} />
                <Input placeholder='Title'
                    onChangeText={onChangeTitle}
                    value={title} />
                <Input
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Description"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={onChangeDescription}
                    value={description}
                />
                <Button title='Done' onPress={() => addEventApi(time, title, description)} />
            </Overlay>
            <Timeline data={myEvents}
                circleSize={12}
                circleColor='rgba(32,137,220, 0.6)'
                lineColor='rgba(32,137,220,0.8)'
                timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                timeStyle={{ textAlign: 'center', backgroundColor: 'rgba(32,137,220,0.7)', color: '#FFFF', padding: 5, borderRadius: 10 }}
                descriptionStyle={{ color: 'gray' }}
                options={{
                    style: {
                        paddingTop: 20,
                        paddingLeft: 20,
                    }
                }
                }
                onEventPress={(event) => editDelete(event)}
            >
            </Timeline>
        </View>
    )
}

export default TimelineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 0.5,
        width: '80%',
        height: '80%',
    },
    eventOverlay: {
        flex: 0.5,
        width: '50%'
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
});