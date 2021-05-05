import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Background from './screens/Background'
import Demo from './screens/Demo'
import TimelineScreen from './screens/TimelineScreen'
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth'
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { AmplifyTheme } from 'aws-amplify-react-native';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true
  }
});

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    }
  ],
}

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('Error signing out: ', error);
  }
}

const AppStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
        <AppStack.Screen name='Home' component={HomeScreen} options={{ headerRight: () => <Button title='Sign Out' color='black' onPress={signOut}></Button> }} />
        <AppStack.Screen name='Background' component={Background} />
        <AppStack.Screen name='TimelineScreen' component={TimelineScreen} options={{ title: 'Timeline' }} />
        <AppStack.Screen name='Demo' component={Demo} options={{ title: 'Research' }} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const authTheme = {
  ...AmplifyTheme,
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: 'black'
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "black",
  }
}
export default withAuthenticator(App, {
  signUpConfig: signUpConfig,
  usernameAttributes: "email",
  theme: authTheme
});
