import { View, Text, SafeAreaView, FlatList,RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeadBar from './components/HeadBar';
import Card from './components/Card';
import { PhotoTypes } from './Types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({navigation} : {navigation : any}) => {
    const [photos,setPhotos] = useState<PhotoTypes[] | null>(null);
    const [refreshing,setRefreshing] = useState(false);
    const [page,setPage] = useState<number>(1);
    const getData = async () => {
        const photosArr = JSON.parse(await AsyncStorage.getItem("photos") || '[]');
        setPhotos(photosArr); 
    }
    const setData = async (data : PhotoTypes[]) => {
        await AsyncStorage.setItem("photos",JSON.stringify(data));
    }
    const fetchData = (pageNum : number)=> {
        setPhotos(null);
        setRefreshing(true);
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${pageNum}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const imgs = data.photos.photo;
            // var isEqual = true;
            // imgs.forEach((el : PhotoTypes) => {
            //     const idx = photos?.findIndex(x => x.id === el.id);
            //     if(idx === -1) isEqual = false;
            // });
            // // console.log(imgs,isEqual,photos)
            // if(!isEqual){
            //     console.log("New images found, replacing cached images!");
            //     setPhotos(imgs);
            //     setData(imgs);
            // }
            setPhotos(imgs); 
        })
        .catch(err => {
            console.log("Error Occured: ",err);
        })
        setRefreshing(false);
    }
    useEffect(()=>{
        getData();
        fetchData(page);
    },[])
  return (
    <SafeAreaView className='w-screen h-screen bg-[#2f2b3a]'>
        <HeadBar text={"Recent Images"}/>
        {/* <View className='justify-center items-center h-24 bg-[#292c28]'>
            <Text className='text-white text-2xl'>
                Recent Images 
            </Text>
        </View> */}
        <View className='w-full text-[25px] flex-1 h-full p-2 justify-center items-center pb-10'>
            <View className='flex-row gap-x-7 justify-between items-center my-3'>
                <TouchableOpacity
                    className={`bg-blue-500 text-white p-1 px-3 ${page === 1 ? "bg-white/50" : ""}`}
                    onPress={() => {
                        fetchData(page-1);
                        setPage(page-1)
                    }}
                    disabled={page === 1}
                    
                >
                    <Text className='text-2xl font-bold'>{"<"}</Text>
                </TouchableOpacity>
                <Text
                    className='bg-blue-500 text-white p-1 px-3 text-2xl font-bold'
                >
                    {page}
                </Text>
                <TouchableOpacity
                    className={`bg-blue-500 text-white p-1 px-3 ${page === 3  ? "bg-white/50" : ""}`}
                    onPress={() => {
                        fetchData(page+1);
                        setPage(page+1)
                    }}
                    disabled={page === 3}
                >
                    <Text className='text-2xl font-bold'>{">"}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={photos}
                numColumns={2}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => {
                        setPage(1);
                        fetchData(1)
                    }} />
                }
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

export default Home