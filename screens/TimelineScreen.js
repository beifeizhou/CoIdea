import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { View, StyleSheet, TextInput, Alert, TouchableOpacity, Button } from 'react-native'
import { Icon, Overlay, Input, Text } from 'react-native-elements'
import { v4 as uuidv4 } from 'uuid'
import { API } from 'aws-amplify'
import { TextInputMask } from 'react-native-masked-text'


const TimelineScreen = ({ navigation, route }) => {
    const { userId, apiName, path } = route.params
    const myInit = {}
    const [myEvents, setMyEvents] = useState([])
    const [time, onChangeTime] = useState('')
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('')
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        API.get(apiName, path, myInit).then(res => setMyEvents(res.events))
    }, [])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [eventVisible, setEventVisible] = useState(false)
    const toggleEventOverlay = (event) => {
        console.log(eventVisible)
        setEventVisible(!eventVisible);
        console.log(eventVisible)
    };

    const custom_sort = (a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
    }

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

    const deleletEvent = (id) => {
        fetch(`http://localhost:5000/events/${id}`, { method: 'DELETE' })
        setEvents(events.filter((each) => each.id != id))
    }

    // Add event via api
    const addEventApi = (time, title, description) => {
        const newEvent = {
            "id": uuidv4(),
            "time": time,
            "title": title,
            "description": description
        }
        const events = [...myEvents, newEvent]

        events.sort(custom_sort)

        const myInit = {
            'body': {
                'user_id': userId,
                'events': events
            }
        }

        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setMyEvents(events)
        setVisible(!visible)
    }

    // Delete via api
    const deleteEventApi = (id) => {
        const events = myEvents.filter((each) => each.id != id)
        console.log(events)
        const myInit = {
            'body': {
                'user_id': userId,
                'events': events
            }
        }
        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setMyEvents(events)
    }

    const editDelete = (event) => {
        const id = event.id
        Alert.alert(
            "Edit or delete this event",
            "",
            [
                { text: "Delete", onPress: () => deleteEventApi(id) },
                { text: "Cancel", style: 'cancel' }
            ],
            { cancelable: false }
        );
    }

    const validateDateTime = () => {
        console.log('Test......')
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Button title='Add' onPress={toggleOverlay}></Button>
        })
    }, [toggleOverlay])

    return (
        <View style={styles.container}>
            {/* <Icon name="add" color="#000000" size={30} onPress={toggleOverlay} style={styles.icon} /> */}
            <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay} >
                <Input
                    label='Time'
                    placeholder='2021/05/24 00:00'
                    onChangeText={onChangeTime}
                    value={time}
                    onFocus={validateDateTime}
                />
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
                circleStyle={{ position: 'absolute', left: 140 }}
                circleSize={16}
                circleColor='rgba(0,0,0, 0.3)'
                lineColor='rgba(0,0,0,0.6)'
                timeContainerStyle={{ minWidth: 125, marginTop: -5 }}
                timeStyle={{ textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.6)', color: '#FFFF', padding: 5, borderRadius: 10 }}
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
    },
    icon: {
        position: 'absolute',
        bottom: 10
    }
});