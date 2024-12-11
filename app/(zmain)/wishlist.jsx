import { View, Text, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { MyContext } from '../context'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

const wishlist = () => {
    const { name } = useContext(MyContext);
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
            const costs = retrivedData.map((data) => Number(data.cost));
            const totalCost = costs.reduce((acc, value) => acc+value, 0);
            setTotalCost(Number(totalCost));
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
  return (
    <View style={{ flex: 1 }}>
            <Text className='text-white text-9xl ml-4 mt-16' style={{ fontFamily: 'UrbanBold', fontSize: 100 }}>Wishlist</Text>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ScrollView>
                {retrivedData.map((data, index) => (
                    <View key={index}>
                        <Text className="text-white text-4xl mt-20 ml-4" style={{ fontFamily: 'UrbanBold' }}>{data.name}</Text>
                        <Text className="text-white text-4xl mt-5 ml-4" style={{ fontFamily: 'UrbanRegular' }}>Rs. {data.cost}</Text>
                        <Pressable onPress={() => removeItem(data.name)} className='ml-4 mt-3'>
                            <Ionicons name="trash" color="white" size={40} />
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            <View id="total" className='h-20 w-62 mt-32 bg-white rounded-2xl'>
            <Pressable><Text className='text-black absolute top-5 left-72 text-3xl' style={{fontFamily: "UrbanItalic"}}>Checkout</Text></Pressable>
                <Text className='text-black text-4xl mt-5 ml-4' style={{fontFamily: 'UrbanBold'}}>Total   Rs. {totalCost}</Text>
            </View>
    </View>
  )
}

export default wishlist