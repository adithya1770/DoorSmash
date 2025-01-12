import { View, Text, TextInput, ImageBackground, Pressable } from 'react-native'
import React, { useState } from 'react'

const deletePdt = () => {

    const [pdtName, setPdtName] = useState('');

    const removeItem = async () => {
        const rem = {
            pdtName: pdtName
        }
        const removal = await fetch("https://ecom-backend-tdex.onrender.com/ecom/destock", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rem)
        })
    }
    return (
    <View>
    <ImageBackground
        source={{uri: "https://images.unsplash.com/photo-1735575721902-2b393187eb36?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
        resizeMode="cover"
        className="h-full w-full"
        >
      <Text className="text-white text-8xl ml-10 mt-16" style={{ fontFamily: 'UrbanBold' }}>destock items</Text>
      <TextInput
      placeholder='Enter Product Name'
      className="w-80 h-16 ml-10 text-3xl border border-gray-400 px-4 mt-20 bg-white rounded-t-xl tracking-wider"
      style={{ fontFamily: 'UrbanRegular' }}
      onChangeText={(text) => setPdtName(text)}
      />
      <Pressable className="h-12 ml-10 rounded-b-2xl w-32 bg-white" onPress={removeItem}>
        <Text className="text-black text-4xl pl-4 pt-1" style={{ fontFamily: 'UrbanBold' }}>Unlist</Text>
      </Pressable>
    </ImageBackground>
    </View>
  )
}

export default deletePdt