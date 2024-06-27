import { View, Text, SafeAreaView, FlatList,RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeadBar from '../../components/HeadBar';
import Card from '../../components/Card';
import { PhotoTypes } from '../../Types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
const Bookmarks = ({navigation} : {navigation : any}) => {
    const [photos,setPhotos] = useState<PhotoTypes[] | null>(null);
    const isFocused = useIsFocused();;
    const getBookmarks = async () => {
        const photosArr = await JSON.parse(await AsyncStorage.getItem("bookmarked") || '[]');
        setPhotos(photosArr); 
    }
    const setBookmarks = async (data : PhotoTypes[]) => {
        await AsyncStorage.setItem("photos",JSON.stringify(data));
    }
    useEffect(()=>{
      getBookmarks();
    },[isFocused])
  return (
    <SafeAreaView className='w-screen h-screen bg-[#2f2b3a]'>
        <HeadBar text={"Bookmarked Images"}/>
        <View className='w-full text-[25px] flex-1 h-full p-2 justify-center items-center pb-24'>
            
            <FlatList
                data={photos}
                numColumns={2}
                renderItem={(({item}) => { 
                    // console.log(item);
                    return(
                        <Card photo={item} navigation={navigation}/>
                    )
                })}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => {
                    return <View className='h-[60vh] justify-center items-center overflow-y-hidden'>
                            <ActivityIndicator size={60} />
                          </View>;
                  }}
            />
        </View>
    </SafeAreaView>
  )
}

export default Bookmarks