import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import ImageScreen from './ImageScreen';
const Stack = createNativeStackNavigator();
const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
