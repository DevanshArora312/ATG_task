import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './DrawerScreens/TabScreens/Home';
import ImageScreen from './ImageScreen';
import Search from './DrawerScreens/Search';
import Bookmarks from './DrawerScreens/TabScreens/Bookmarks';
import { Image, Text, View } from 'react-native';
import { TabIconPropType } from './Types';
import icons from './constants/icons';
import Profile from './DrawerScreens/Profile';
import CommentsPage from './DrawerScreens/CommentsPage';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeRoot = () => {
  return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeStack" component={Home} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    
  )
}

const SearchRoot = () => {
  return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SearchStack" component={Search} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    
  )
}

const BoookmarkRoot = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BookmarkStack" component={Bookmarks} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerShown: false}} />
    </Stack.Navigator> 
)
}

const TabIcon = ({ icon, color, name, focused } : TabIconPropType ) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};


const TabRoot = () => {
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown : false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 64,
        },
      }}
    >
      <Tab.Screen 
        name="Recent" 
        component={HomeRoot} 
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Page 2" 
        component={BoookmarkRoot} 
        options={{
          title: "Bookmark",
          headerShown: false,
          unmountOnBlur:true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          ),
        }}  
      />
    </Tab.Navigator>
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
        <Drawer.Screen name="Home" component={TabRoot}  />
        <Drawer.Screen name="Search" component={SearchRoot}  />
        <Drawer.Screen name="Get Comments By ID" component={CommentsPage}  />
        <Drawer.Screen name="Profile" component={Profile}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Index;
