import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { PhotoTypes } from '../Types'


const Card = ({photo,navigation} : {photo : PhotoTypes,navigation:any}) => {
  return (
    <TouchableOpacity 
        className='w-[45%] aspect-square m-2 border-2 border-white'
        onPress={() => {
            navigation.navigate("ImageScreen", photo);
        }}
    >
        <Image
            source={{uri : photo?.url_s}}
            className='flex-1 object-cover '
        />
    </TouchableOpacity>
  )
}

export default Card