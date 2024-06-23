import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import ImageScreen from './ImageScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    
  )
}

const Index = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName='Recent Images' 
        screenOptions={
          {
            headerTransparent:true,
            headerTitleStyle:{color:'transparent'},
            headerTintColor:"white",
            headerTitle:"",
            drawerType:"slide",
          }
        }
      >
        <Drawer.Screen name="Home" component={Root}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Index;
