import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { MyContext } from '../context'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

const wishlist = () => {
    const { name } = useContext(MyContext);
    const [retrivedData, setRetrivedData] = useState([]);
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
    <View>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View>
            {
            retrivedData.map((data, index) => (
                <View key={index}>
                    <Text className="text-white text-4xl mt-32">{data}</Text>
                    <Pressable onPress={() => removeItem(data)}>
                        <Ionicons name="trash" color="white" size={40}/>
                    </Pressable>
                </View>
            ))
            }
        </View>
    </View>

  )
}

export default wishlist