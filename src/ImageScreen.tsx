import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { PhotoTypes } from './Types'
import HeadBar from './components/HeadBar';

const ImageScreen = ({navigation,route} : {navigation : any,route : any}) => {
    // console.log(route.params)
    const photo = route.params;
    // console.log(photo.url_s)
  return (
    <SafeAreaView className='w-screen h-screen bg-[#2f2b3a] items-center'>
        <HeadBar text={"Single Image"}/>
        <ScrollView 
            contentContainerStyle={{
                padding:20,
                alignItems:"center",
                rowGap:20,
                width:"100%",
                flexGrow:2,
                paddingBottom:50
            }}    
        >
        
            <Text className='text-2xl text-white font-bold '>{photo.title}</Text>
            <Image
                source={{uri : photo.url_s}}
                className='aspect-square object-cover w-full'
            />
            <Text className='text-xl text-white font-semibold ' >Id : {photo.id}</Text>
            <Text className='text-xl text-white font-semibold ' >Width : {photo.width_s}</Text>
            <Text className='text-xl text-white font-semibold ' >Height : {photo.height_s}</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ImageScreen