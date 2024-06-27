import { View, Text, SafeAreaView,Image, TouchableOpacity,TouchableHighlight } from 'react-native'
import React from 'react'
import HeadBar from '../components/HeadBar'
import icons from '../constants/icons';
import Snackbar from 'react-native-snackbar';

const Profile = () => {
  return (
    <SafeAreaView className='w-screen h-screen bg-[#2f2b3a] items-center'>
        <HeadBar text={"Profile"}/>
        <View className='w-full h-auto items-center gap-y-5 px-4 py-10'>
            <Image
                source={icons.profile}
                className={"object-cover"}
                width={150}
            />
            <View className='flex-row gap-x-4 w-full p-2  font-medium text-white justify-center items-center'>
                <Text className='text-[20px]'>Name: </Text>
                <View className='bg-black/25 border-[1px] border-slate-200 rounded-xl text-slate-600 p-2 px-5 w-[80%]'>
                    <Text className='text-[20px] text-left' >John Doe</Text>
                </View>
            </View>
            <View className='flex-row gap-x-4 w-full p-2  font-medium text-white justify-center items-center'>
                <Text className='text-[20px]'>Email: </Text>
                <View className='bg-black/25 border-[1px] border-slate-200 rounded-xl text-slate-600 p-2 px-5 w-[80%]'>
                    <Text className='text-[20px] text-left' >John@doe-main.com</Text>
                </View>
            </View>
            <TouchableOpacity 
                activeOpacity={1}
                className='bg-green-500 rounded-xl text-xl p-2 px-3 shadow-xl shadow-green-300 active:scale-95 duration-200 text-white'
                onPress={() => {
                    Snackbar.show({
                        text: 'Will be implemented soon!!',
                        duration: Snackbar.LENGTH_LONG,
                        textColor: '#fff',
                        backgroundColor: '#0000ff'
                    });
                }}
            >
                <Text className='text-[25px]'>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Profile