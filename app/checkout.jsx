import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { MyContext } from './context'

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
      <TextInput className='h-14 w-64 bg-white rounded-2xl pl-4 mt-12 ml-12' placeholder='enter your address' style={{fontFamily: "UrbanBold"}} onChangeText={(text) => setAddress(text)}></TextInput>
      <Text className='text-white text-3xl mt-10 ml-12' style={{fontFamily: 'UrbanBold'}}>Total Rs.{cost}</Text>
      <ScrollView>
        <Text className='text-white text-8xl ml-12 mt-4' style={{fontFamily: 'UrbanBold'}}>Invoice</Text>
                {data.map((data, index) => (
                    <View key={index}>
                        <Text className="text-white text-4xl mt-10 ml-12" style={{ fontFamily: 'UrbanBold' }}>{data.name}</Text>
                        <Text className="text-white text-4xl mt-5 ml-12" style={{ fontFamily: 'UrbanRegular' }}>Rs. {data.cost}</Text>
                    </View>
                ))}
            </ScrollView>
      <Pressable className='h-14 w-40 rounded-2xl bg-white ml-12 mt-10' onPress={placeOrder}>
        <Text className='text-black pt-2 pl-4 text-2xl' style={{fontFamily: 'UrbanBold'}}>Place Order</Text>
      </Pressable>
      <Text className='text-3xl ml-12 mt-4 text-white' style={{fontFamily: 'UrbanBold'}}>{invoice}</Text>
    </View>
  )
}

export default checkout