import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { MyContext } from './context'
import { ImageBackground } from 'react-native'

const checkout = () => {
  const {cost, data} = useContext(MyContext);
  const [addressN, setAddress] = useState('');
  const [invoice, setInvoice] = useState('');

  const placeOrder = async () => {
    const invoicePayload = {
      address: addressN,
      items: data,
      cost: cost
    };
    const placingOrder = await fetch("https://ecom-backend-tdex.onrender.com/ecom/checkout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoicePayload)
    })
    const invoiceGen = await placingOrder.json();
    setInvoice(invoiceGen.message);
  }
  return (
    <View>
      <ImageBackground source={{uri: "https://i.pinimg.com/736x/1a/34/32/1a3432795d5e796fc56012b120404a0c.jpg"}}         resizeMode="cover"
        className="h-full w-full">
      <ScrollView className="p-4 rounded-3xl">
        <Text className="text-white text-8xl ml-8 mt-10" style={{ fontFamily: 'UrbanBold' }}>Invoice</Text>
        {data.map((data, index) => (
            <View key={index} className="bg-gray-700 p-4 rounded-xl mt-6 mx-4">
                <Text className="text-white text-3xl" style={{ fontFamily: 'UrbanBold' }}>{data.name}</Text>
                <Text className="text-white text-3xl mt-2" style={{ fontFamily: 'UrbanRegular' }}>Rs. {data.cost}</Text>
            </View>
        ))}
    </ScrollView>
    <Text className='text-white text-5xl mt-10 ml-10' style={{fontFamily: 'UrbanBold'}}>Total {cost}/-</Text>
      <TextInput className='h-20 w-72 bg-white rounded-2xl pl-4 mt-6 ml-10 text-3xl' placeholder='enter your address' style={{fontFamily: "UrbanBold"}} onChangeText={(text) => setAddress(text)}></TextInput>
      <Pressable className='h-14 w-40 rounded-2xl bg-white ml-10 mt-2' onPress={placeOrder}>
        <Text className='text-black pt-2 pl-4 text-2xl' style={{fontFamily: 'UrbanBold'}}>Place Order</Text>
      </Pressable>
      <Text className='text-3xl ml-12 mt-4 text-white' style={{fontFamily: 'UrbanBold'}}>{invoice}</Text>
      </ImageBackground>
    </View>
  )
}

export default checkout