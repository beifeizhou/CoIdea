import React from 'react'
import { ScrollView, Button, View, StyleSheet, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { List } from 'react-native-paper';



const Project = ({ navigation }) => {

    // Example: https://callstack.github.io/react-native-paper/list-accordion.html
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

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
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Placeholder project 1</ListItem.Title>
                            </ListItem.Content>
                            {/* <ListItem.Chevron /> */}
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Placeholder project 2</ListItem.Title>
                            </ListItem.Content>
                            {/* <ListItem.Chevron /> */}
                        </ListItem>
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