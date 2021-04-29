import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Background from './screens/Background'
import Demo from './screens/Demo'
import TimelineScreen from './screens/TimelineScreen'

const AppStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
        <AppStack.Screen name='Home' component={HomeScreen} options={{ title: 'CoIdea' }} />
        <AppStack.Screen name='Background' component={Background} />
        <AppStack.Screen name='TimelineScreen' component={TimelineScreen} />
        <AppStack.Screen name='Demo' component={Demo} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
