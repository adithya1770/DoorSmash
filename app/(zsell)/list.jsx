import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

const list = () => {
    const [getItem, setItem] = useState([]);
    useEffect(() => {
        const retriveItem = async () => {
            const items = await fetch("https://ecom-backend-tdex.onrender.com/ecom/check", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const itemRet = await items.json();
            setItem(itemRet);
        }
    retriveItem();
    })
  return (
    <ScrollView>
        <ImageBackground
        source={{uri:"https://plus.unsplash.com/premium_photo-1674902194252-e26defd689aa?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
        resizeMode="cover"
        className="h-full w-full"
        >
            <Text className="text-white text-7xl ml-14 mt-16" style={{ fontFamily: 'UrbanBold' }}>inventory</Text>
      {
        getItem.map((data) => (
            <View key={data._id} className="p-10 bg-black rounded-lg shadow-lg mt-4 max-w-xs mx-auto">
            <Text className="text-white text-3xl font-semibold" style={{ fontFamily: 'UrbanBold' }}>{data.pdtName}</Text>
            <Text className="text-white text-lg mt-2" style={{ fontFamily: 'UrbanRegular' }}>Cost: ₹{data.pdtCost}</Text>
            <Text className="text-white text-lg mt-1" style={{ fontFamily: 'UrbanRegular' }}>Quantity: {data.pdtQuantity}</Text>
            <Text className="text-white text-lg mt-2" style={{ fontFamily: 'UrbanRegular' }}>Product Rating: 
                <Text className="text-yellow-400" style={{ fontFamily: 'UrbanRegular' }}> {data.pdtRating}</Text>
            </Text>
            <Text className="text-white text-lg mt-1" style={{ fontFamily: 'UrbanRegular' }}>Seller Rating: 
                <Text className="text-yellow-400" style={{ fontFamily: 'UrbanRegular' }}> {data.pdtSellerRating}</Text>
            </Text>
        </View>
        ))
      }
      </ImageBackground>
    </ScrollView>
  )
}

export default list