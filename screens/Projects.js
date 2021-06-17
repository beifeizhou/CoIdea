import React, { useEffect, useState } from 'react'
import { ScrollView, Button, View, StyleSheet, Alert } from 'react-native'
import { ListItem, Overlay, Input } from 'react-native-elements'
import { List } from 'react-native-paper'
import Amplify from '@aws-amplify/core'
import awsmobile from '../src/aws-exports'
import { API } from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import { v4 as uuidv4 } from 'uuid'

Amplify.configure({
    ...awsmobile,
    Analytics: {
        disabled: true
    }
});

const Project = ({ navigation }) => {
    const apiName = 'coideadev'

    const [userId, setUserId] = useState(null)
    const [email, setEmail] = useState(null)
    const [checkUser, setCheckUser] = useState(null)
    const [title, onChangeTitle] = useState('')
    const [visible, setVisible] = useState(false);
    const [jsonObj, setJsonObj] = useState(
        {
            user_id: null,
            info: {
                email: null,
                projects: []
            }
        }
    )
    const [project, setProject] = useState(
        {
            project_id: null,
            project_name: null,
            is_mine: null,
            background: null,
            research: null,
            roadmap: null,
            events: []
        }
    )
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        Auth.currentUserInfo()
            .then((data) => { setUserId(data.id); setEmail(data.attributes.email) })
            .catch(error => console.log(`Error: ${error.message}`))
    }, [])

    const path = `/users/${userId}`

    useEffect(() => {
        if (userId != null) {
            const myInit = {}
            API.get(apiName, path, myInit)
                .then(res => {
                    if (res != null) {
                        setJsonObj(res)
                        setCheckUser(true)
                    } else {
                        setCheckUser(false)
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }, [userId, email])

    useEffect(() => {
        if (userId != null && !checkUser) {
            const myInit = {
                'body': {
                    'email': email
                }
            }
            setJsonObj({ 'info': myInit['body'] })
            API.post(apiName, path, myInit)
                .then(res => { console.log(res) })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }, [checkUser])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const addProject = (title) => {
        const newProject = {
            project_id: uuidv4(),
            project_name: title,
            is_mine: true
        }

        const projects = jsonObj['info']['projects']

        const newProjects = [...projects, newProject]
        jsonObj['info']['projects'] = newProjects
        const myInit = {
            'body': jsonObj['info']
        }

        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setVisible(!visible)
    }

    const deleteProject = (projectId) => {
        const projects = jsonObj['info']['projects']
        const rest = projects.filter((project) => project.project_id != projectId)
        jsonObj['info']['projects'] = rest

        const myInit = {
            'body': jsonObj['info']
        }
        API.post(apiName, path, myInit)
            .then(response => { console.log(response) })
            .catch(error => {
                console.log(error.response);
            })
        setIsDeleted(true)
    }

    const editDelete = (project) => {
        const id = project.project_id
        console.log(id)
        Alert.alert(
            "Delete this project",
            "",
            [
                { text: "Delete", onPress: () => deleteProject(id) },
                { text: "Cancel", style: 'cancel' }
            ],
            { cancelable: false }
        )
    }

    // Example: https://callstack.github.io/react-native-paper/list-accordion.html
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const myProjects = jsonObj['info']['projects'].filter((project) => project.is_mine == true)
    const sharedProjects = jsonObj['info']['projects'].filter((project) => project.is_mine == false)
    return (
        <View style={{ flex: 0.95 }}>
            <ScrollView>
                <List.Section>
                    <List.Accordion title="My projects" expanded={expanded} onPress={handlePress}>
                        {myProjects.map((myProject, i) => (
                            <ListItem key={i}
                                bottomDivider
                                onLongPress={() => editDelete(myProject)}
                                onPress={() => navigation.navigate("Home", { userId: userId, apiName: apiName, path: path, projectId: myProject['project_id'] })}>
                                <ListItem.Content>
                                    <ListItem.Title>{myProject.project_name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                        }
                    </List.Accordion>
                    <List.Accordion title="Shared with me" expanded={expanded} onPress={handlePress}>
                        {sharedProjects.map((sharedProject, i) => (
                            <ListItem key={i} bottomDivider onPress={() => navigation.navigate("Home", { userId: userId, apiName: apiName, path: path, projectId: sharedProject['project_id'] })}>
                                <ListItem.Content>
                                    <ListItem.Title>{sharedProject.project_name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                        }
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <View>
                <Button title='Add new project' style={styles.button} onPress={toggleOverlay} />
            </View>
            <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay} >
                <Input placeholder='Project name'
                    onChangeText={onChangeTitle}
                    value={title} />
                <Button title='Done' onPress={() => addProject(title)} />
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    overlay: {
        width: '80%',
        height: '15%',
    }
})

export default Project;