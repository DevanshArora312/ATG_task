import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeadBar from './components/HeadBar';
import Card from './components/Card';
import { PhotoTypes } from './Types';

const Home = ({navigation} : {navigation : any}) => {
    const [photos,setPhotos] = useState<PhotoTypes[] | null>(null);
    const getData = async () => {
        const photosArr = JSON.parse(await AsyncStorage.getItem("photos") || '[]');
        setPhotos(photosArr); 
    }
    const setData = async (data : PhotoTypes[]) => {
        await AsyncStorage.setItem("photos",JSON.stringify(data));
    }
    useEffect(()=>{
        getData();
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s')
        .then(res => {
            return res.json();
        })
        .then(data => {
            const imgs = data.photos.photo;
            var isEqual = true;
            imgs.forEach((el : PhotoTypes) => {
                const idx = photos?.findIndex(x => x.id === el.id);
                if(idx === -1) isEqual = false;
            });
            if(!isEqual){
                console.log("New images found, replacing cached images!");
                setPhotos(imgs);
                setData(imgs);
            }
        })
        .catch(err => {
            console.log("Error Occured: ",err);
        })
    },[])
  return (
    <SafeAreaView className='w-screen h-screen bg-[#2f2b3a]'>
        <HeadBar text={"Recent Images"}/>
        {/* <View className='justify-center items-center h-24 bg-[#292c28]'>
            <Text className='text-white text-2xl'>
                Recent Images 
            </Text>
        </View> */}
        <View className='w-full flex-1 h-full p-2 justify-center items-center'>
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
            />
        </View>
    </SafeAreaView>
  )
}

export default Home