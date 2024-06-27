import { View, Text } from 'react-native'
import React from 'react'

const CommentCard = ({comment} : any) => {
  return (
    <View className='w-[80%] gap-y-2 my-3'>
      <Text>{comment.authorname}</Text>
      <View className='border-[1px] border-slate-200 text-white bg-black/30 p-4'>
            <Text>
                {comment._content}
            </Text>
      </View>
    </View>
  )
}

export default CommentCard