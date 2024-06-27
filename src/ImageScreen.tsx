import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PhotoTypes } from './Types'
import HeadBar from './components/HeadBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const ImageScreen = ({navigation,route} : {navigation : any,route : any}) => {
    // console.log(route.params)
    const photo = route.params;
    const [booked,setBooked] = useState<boolean>(false);
    const [book,setBook]  = useState<PhotoTypes[]>([]);
    const isFocused = useIsFocused();
    const checkBookmarks = async (id : string) => {
        const arr = await AsyncStorage.getItem("bookmarked");
        const photosArr = await JSON.parse(arr || '[]');
        setBook(photosArr);
        return photosArr.some((el : PhotoTypes) => el.id === id);
    }
    useEffect(()=>{
        checkBookmarks(photo.id)
        .then(res => setBooked(res));
        // setBooked(val);
    },[isFocused])
    // console.log(book);
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
                paddingBottom:100
            }}    
        >
        
            <View className='w-full items-center justify-around gap-4'>
                <Text className='text-2xl text-white font-bold '>{photo.title}</Text>
                {
                    booked ? 
                    <TouchableOpacity 
                        onPress={() => {
                            setBooked(false);
                            const newPhotos = book!.filter((el:PhotoTypes) => el.id !== photo.id);
                            setBook(newPhotos);
                            
                            AsyncStorage.setItem("bookmarked",JSON.stringify(newPhotos));
                        }}
                    >
                        <Text className='p-3 text-white bg-black rounded-lg'>
                            Remove from Bookmarks
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            setBooked(true);
                            const newPhotos = [...book,photo];
                            setBook(newPhotos);
                            // console.log(book);
                            AsyncStorage.setItem("bookmarked",JSON.stringify(newPhotos));
                        }}
                    >
                        <Text className='p-3 text-white bg-black rounded-lg' >Add to Bookmarks</Text>
                    </TouchableOpacity>
                }
            </View>
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