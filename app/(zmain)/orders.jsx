import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

const Orders = () => {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const orderDetails = async () => {
      const response = await fetch("https://ecom-backend-tdex.onrender.com/ecom/order", {
        method: 'POST'
      });
      const data = await response.json();
      setOrder(data);
    };
    orderDetails();
  }, []); 

  return (
    <View className="flex-1">
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/f1/24/0d/f1240dfe0560bbfa45b66954482ea634.jpg",
        }}
        resizeMode="cover"
        className="h-full w-full"
      >
      <Text className="text-9xl text-white mt-14 ml-8" style={{fontFamily: "UrbanBold"}}>orders</Text>
      <ScrollView className="bg-gray-900 p-6 rounded-t-3xl">
        {orders.map((item) => (
          <View key={item._id} className="bg-black p-6 rounded-lg mb-2">
            <Text className="text-white text-xl ml-6 mt-4" style={{ fontFamily: 'UrbanRegular' }}>
              Consumer Name: <Text className="font-bold" style={{ fontFamily: 'UrbanItalic'}}>{item.consumerName}</Text>
            </Text>
            <Text className="text-white text-xl ml-6" style={{ fontFamily: 'UrbanRegular' }}>
              Consumer Address: <Text className="font-bold"  style={{ fontFamily: 'UrbanItalic'}}>{item.consumerAddress}</Text>
            </Text>
            <View>
              <Text className="text-2xl text-white ml-6 mt-4" style={{ fontFamily: 'UrbanRegular' }}>
                Order Items:
              </Text>
              {item.orderItems.map((product, index) => (
                <Text key={index} className="text-white text-xl ml-8" style={{ fontFamily: 'UrbanRegular' }}>
                  - {product.name} (Rs. <Text className='text-green-500'>{product.cost}</Text>)
                </Text>
              ))}
            </View>
            <Text className="text-xl text-white ml-6 mt-10 pt-6 h-14" style={{ fontFamily: 'UrbanBold' }}>
              Total Cost   Rs. <Text className="text-green-700 text-4xl">{item.totalCost}</Text>
            </Text>
          </View>
        ))}
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Orders;
