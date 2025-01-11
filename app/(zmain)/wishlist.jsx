import { View, Text, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { MyContext } from '../context'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router' 
import { ImageBackground } from 'react-native'

const wishlist = () => {
    const router = useRouter();
    const { name, setCost, setData } = useContext(MyContext);
    const [retrivedData, setRetrivedData] = useState([]);
    const [totalCost, setTotalCost] = useState(null);
    useEffect(() => {
        const retriveFuntion = async () => {
            const req = await fetch("https://ecom-backend-tdex.onrender.com/wishlist/cart", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: name
            })
            const returnValue = await req.json();
            setRetrivedData(returnValue["data"]);
            setData(returnValue["data"])
            const costs = retrivedData.map((data) => Number(data.cost));
            const totalCost = costs.reduce((acc, value) => acc+value, 0);
            setTotalCost(Number(totalCost));
            setCost(totalCost);
        }
        retriveFuntion();
    });

    const removeItem = async (item) => {
        const itemToBeRemoved = await fetch("https://ecom-backend-tdex.onrender.com/wishlist/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": item})
        })
    }

    const redirecTer = () => {
        router.push('/checkout');
    }
  return (
    <View style={{ flex: 1 }}>
        <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1675937338184-3d8d8f2e94b3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
        }}
        resizeMode="cover"
        className="h-full w-full"
      >
            <Text className='text-white text-9xl ml-4 mt-16' style={{ fontFamily: 'UrbanBold', fontSize: 90 }}>My Cart</Text>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ScrollView className="bg-gray-900 p-4 rounded-2xl mt-6">
            {retrivedData.map((data, index) => (
                <View key={index} className="bg-gray-800 p-4 rounded-xl mt-6 mx-4 w-96 shadow-lg relative">
                <Text className="text-white text-3xl" style={{ fontFamily: 'UrbanBold' }}>
                    {data.name}
                </Text>
                <Text className="text-white text-2xl mt-2" style={{ fontFamily: 'UrbanRegular' }}>
                    Rs. {data.cost}
                </Text>
                <Pressable onPress={() => removeItem(data.name)} className="absolute right-5 mt-7 ml-8">
                    <Ionicons name="trash" color="red" size={40} />
                </Pressable>
                </View>
            ))}
            </ScrollView>
            <View id="total" className='h-32 w-62 mt-32 bg-gray-900 rounded-2xl p-4'>
            <Pressable onPress={redirecTer} className="bg-white rounded-xl py-2 px-6 self-center mb-2">
                <Text className='text-black text-3xl' style={{fontFamily: "UrbanBold", textAlign: 'center'}}>Checkout</Text>
            </Pressable>
            <Text className='text-white text-4xl' style={{fontFamily: 'UrbanBold', alignSelf: 'flex-start', marginLeft: 100}}>Total {totalCost}/-</Text>
            </View>
            </ImageBackground>
        </View>
  )
}

export default wishlist