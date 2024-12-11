import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

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
      <Text className="text-9xl text-white mt-14 ml-3" style={{fontFamily: "UrbanBold"}}>Orders</Text>
      <View>
        {orders.map((item) => (
          <View key={item._id} className="mb-4">
            <Text className="text-xl text-white ml-10 mt-10" style={{fontFamily: "UrbanRegular"}}>Consumer Name: {item.consumerName}</Text>
            <Text className="text-xl text-white ml-10" style={{fontFamily: "UrbanRegular"}}>Consumer Address: {item.consumerAddress}</Text>
            <View>
              <Text className="text-lg text-white ml-10" style={{fontFamily: "UrbanRegular"}}>Order Items:</Text>
              {item.orderItems.map((product, index) => (
                <Text key={index} className="text-white ml-10" style={{fontFamily: "UrbanRegular"}}>
                  - {product.name} (Rs. {product.cost})
                </Text>
              ))}
            </View>
            <Text className="text-xl text-white ml-10" style={{fontFamily: "UrbanRegular"}}>Total Cost: Rs. {item.totalCost}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Orders;