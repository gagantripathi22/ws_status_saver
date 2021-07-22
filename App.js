import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HomeScreen from './src/screens/home/index'
import StatusViewScreen from './src/screens/statusView/index'
import InfoScreen from './src/screens/info/index'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container} theme={{ colors: { background: '#141414' } }}>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StatusView" component={StatusViewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={InfoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#141414',
  },
})