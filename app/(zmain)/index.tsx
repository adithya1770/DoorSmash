import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput, Pressable } from 'react-native'
import { ScrollView } from 'react-native'

const index = () => {

  const [pdtData, setPdtData] = useState([]);

  useEffect(() => {
    const productFetch = async () => {
      const productRoute = await fetch("https://ecom-backend-tdex.onrender.com/ecom/check");
      const productRouteNew = await productRoute.json();
      setPdtData(productRouteNew);
    }
    productFetch();
  })

  return (
    <View className='flex-1'>
    <StatusBar translucent={true} backgroundColor='transparent'/>
    <Text className='text-9xl text-white mt-20 ml-4' style={{ fontFamily: "UrbanBold" }}>Home</Text>
    
    <TextInput
      className='h-14 w-80 mt-2 ml-5 rounded-2xl bg-white pl-4 text-2xl'
      placeholder='search now'
      style={{ fontFamily: 'UrbanRegular' }}
    />
    
    <Pressable className='bg-white h-10 rounded-e-2xl w-32 ml-6 pl-4 mt-2'>
      <Text style={{ fontFamily: 'UrbanBold' }} className='text-3xl'>search</Text>
    </Pressable>
    
    <ScrollView className='mt-6 overflow-y-scroll'>
      <View>
        {
          pdtData.map((data, index) => (
            <View key={index} className='bg-white h-96 w-96 rounded-xl p-4 mt-4 ml-6 shadow-lg'>
              <Text className='text-2xl text-black' style={{fontFamily:'UrbanBold'}}>{data.pdtName}</Text>
              <Text className='text-lg text-gray-700 mt-2' style={{fontFamily:'UrbanRegular'}}>{data.pdtDetails}</Text>
              <Text className='text-xl text-primary mt-2' style={{fontFamily:'UrbanItalic'}}>Rs. {data.pdtCost}</Text>
              <Text className='text-xl text-primary mt-2' style={{fontFamily:'UrbanRegular'}}>{data.pdtAvl}</Text>
              <Pressable className='bg-primary h-10 mt-10 rounded-xl justify-center items-center'>
                <Text className='text-black text-lg ' style={{fontFamily: 'UrbanBold'}}>Add to Cart</Text>
              </Pressable>
            </View>
          ))
        }
      </View>
    </ScrollView>

  </View>
  
  )
}

export default index