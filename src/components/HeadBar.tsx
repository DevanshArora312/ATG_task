import { View, Text } from 'react-native'
import React from 'react'

const HeadBar = ({text} : {text : string}) => {
  return (
    <View className="w-full bg-[#121212] h-20 items-center justify-center">
      <Text className='text-white text-xl'>{text}</Text>
    </View>
  )
}

export default HeadBar