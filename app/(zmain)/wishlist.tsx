import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { MyContext } from '../context'

const wishlist = () => {
    const { name } = useContext(MyContext);
    const [retrivedData, setRetrivedData] = useState('');
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
            setRetrivedData(JSON.stringify(returnValue["data"]));
        }
        retriveFuntion();
    });
  return (
    <View>
        <StatusBar backgroundColor="transparent" translucent={true}/>
        <Text className='text-white text-3xl'>{retrivedData}</Text>
    </View>
  )
}

export default wishlist