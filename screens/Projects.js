import React, { useEffect, useState } from 'react'
import { ScrollView, Button, View, StyleSheet, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { List } from 'react-native-paper'
import Amplify from '@aws-amplify/core'
import awsmobile from '../src/aws-exports'
import { API } from 'aws-amplify'
import Auth from '@aws-amplify/auth'

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
    const [jsonObj, setJsonObj] = useState(
        {
            user_id: null,
            info: {
                email: null,
                projects: []
            }
        }
    )

    useEffect(() => {
        Auth.currentUserInfo()
            .then((data) => { setUserId(data.id); setEmail(data.attributes.email) })
            .catch(error => console.log(`Error: ${error.message}`))
    }, [])

    const path = `/users/${userId}`

    useEffect(() => {
        if (userId != null) {
            console.log(userId)
            const myInit = {}
            API.get(apiName, path, myInit)
                .then(res => {
                    if (res != null) {
                        setJsonObj(res)
                        console.log(res)
                        setCheckUser(true)
                    } else {
                        console.log(res)
                        setCheckUser(false)
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }, [userId, email])
    console.log(userId)
    console.log(path)
    console.log(email)
    console.log(checkUser)

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
    console.log(`jsonObj: ${JSON.stringify(jsonObj)}`)

    // Example: https://callstack.github.io/react-native-paper/list-accordion.html
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const sharedProjects = jsonObj['info']['projects'].filter((project) => project.is_mine == false)
    return (
        <View style={{ flex: 0.95 }}>
            <ScrollView>
                <List.Section>
                    <List.Accordion title="My projects" expanded={expanded} onPress={handlePress}>
                        <ListItem bottomDivider onPress={() => navigation.navigate("Home")} >
                            <ListItem.Content>
                                <ListItem.Title>Go to home project</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Placeholder project 1</ListItem.Title>
                            </ListItem.Content>
                            {/* <ListItem.Chevron /> */}
                        </ListItem>
                        {/* <List.Item title="Placeholder project 2" /> */}
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
                <Button title='Add new project' style={styles.button} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    }
})

export default Project;