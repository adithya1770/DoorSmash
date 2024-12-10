import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput, Pressable } from 'react-native'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const index = () => {

  const [pdtData, setPdtData] = useState([]);
  const [onClick, setOnClick] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const productFetch = async () => {
      const productRoute = await fetch("https://ecom-backend-tdex.onrender.com/ecom/check");
      const productRouteNew = await productRoute.json();
      setPdtData(productRouteNew);
    }
    productFetch();
  })

  const addToCart = async (pdtName) => {
    const addingCart = await fetch("https://ecom-backend-tdex.onrender.com/wishlist/addproduct", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name": pdtName})
    });
  }

  const onClicker = () => {
    setOnClick(prevState => !prevState);
  };

  const sendComment = async(commentN, sellerN, name) => {
    const commentPayload = {
      product: name,
      seller: sellerN,
      comment: commentN
    }
    const addCom = await fetch("https://ecom-backend-tdex.onrender.com/review/comment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentPayload)
    })
  }

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
              <Text className='text-xl text-primary mt-2' style={{fontFamily:'UrbanRegular'}}>{data._id}</Text>
              <Text className='text-xl text-primary mt-2' style={{fontFamily:'UrbanBold'}}>Seller - {data.pdtSellerName}</Text>
              {onClick ? (
                  <View className='h-28 mt-2 w-80 rounded-xl ml-3 bg-black'>
                    <Pressable className="ml-72" onPress={onClicker}>
                      <Ionicons size={20} name="close" color="white"/>
                    </Pressable>
                    <Text className='text-white text-xl ml-3' style={{fontFamily: 'UrbanRegular'}}>{data.pdtComments}</Text>
                    <TextInput className='h-10 w-40 ml-3 mt-1 bg-white rounded-2xl' placeholder='comment here' style={{fontFamily: 'UrbanRegular'}} onChangeText={(text) => setComment(text)}></TextInput>
                    <Pressable className='ml-48 top-16 absolute' onPress={() => sendComment(comment, data.pdtSellerName, data.pdtName)}>
                      <Ionicons name="send" color="white" size={25}/>
                    </Pressable>
                  </View>
                ): <Text></Text>}
              <View className='flex-row justify-between items-center'>
                <Pressable className='bg-primary h-10 mt-6 rounded-xl justify-center items-center' onPress={() => addToCart(data.pdtName)}>
                  <Text className='text-white text-lg h-10 w-32 pl-4 rounded-2xl pt-1 mt-16 bg-black' style={{fontFamily: 'UrbanBold'}}>Add to Cart</Text>
                </Pressable>
                <Pressable className='bg-primary h-10 mt-6 rounded-xl justify-center items-center' onPress={() => addToCart(data.pdtName)}>
                  <Text className='text-white text-lg h-10 w-32 pl-4 rounded-2xl pt-1 mt-16 bg-black' style={{fontFamily: 'UrbanBold'}} onPress={onClicker}>Comments</Text>
                </Pressable>
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>

  </View>
  
  )
}

export default index