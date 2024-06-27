import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import HeadBar from '../components/HeadBar'
import Snackbar from 'react-native-snackbar';
import CommentCard from '../components/CommentCard';

const CommentsPage = () => {
    const [query,setQuery] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    const [searchResult,setSearchResult] = useState(null);
    const handleSubmit = () => {
        if(query === '') return;
        setSearchResult(null);
        setLoading(true);
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6f102c62f41998d151e5a1b48713cf13&photo_id=${query}&format=json&nojsoncallback=1&extras=url_s`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // throw Error("hehe");
            setSearchResult(data.comments.comment);
            setLoading(false);
        })
        .catch(err => {
            console.log("Error occured in search fetch: ",err);
            Snackbar.show({
                text: 'Network Error! Please retry after checking your network connection!',
                duration: Snackbar.LENGTH_LONG,
                textColor: '#fff',
                backgroundColor: '#cc0000'
            });
            setLoading(false);
        })
        // setLoading(false);
    }
    const handleClear = () =>{
        setQuery("");
        setSearchResult(null);
    }
  return (
    <SafeAreaView className='w-screen h-screen bg-[#2f2b3a] items-center'>
        <HeadBar text={'Comments'} />
        <View className='w-full items-center justify-center gap-x-2 flex-row my-2'>
            <TextInput
                placeholder='Enter Photo-ID'
                placeholderTextColor={"black"}
                onChangeText={text => setQuery(text)}
                value={query}
                className='p-2 pl-3 h-full w-[55%] bg-white/80 rounded-full text-black' 
            />
            <View className='flex-row justify-center gap-x-1 items-center'>
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    className='bg-black/80 rounded-full py-3 px-4'
                >
                    <Text>
                        Search
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleClear}
                    className='bg-black/80 rounded-full py-3 px-4'
                >
                    <Text>
                        Clear
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View className='w-full flex-1 h-full p-2 justify-center items-center '>
            {
                searchResult ? 
                <FlatList
                    data={searchResult}
                    numColumns={2}
                    renderItem={(({item}) => { 
                        // console.log(item);
                        return(
                            <CommentCard comment={item} />
                        )
                    })}
                    keyExtractor={(item) => item.id}
                />
                :
                loading ?
                <ActivityIndicator size={60} />
                : 
                <Text className='text-lg text-white text-center'>
                    Type the photo-id and hit the search button to get comments.
                </Text>
            }
        </View>
    </SafeAreaView>
  )
}

export default CommentsPage