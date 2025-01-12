import { View, Text, TextInput, ScrollView, Pressable, ImageBackground } from 'react-native';
import React, { useState } from 'react';

const index = () => {
  const [pdtName, setPdtName] = useState('');
  const [pdtQty, setPdtQty] = useState('');
  const [pdtDetails, setPdtDetails] = useState('');
  const [pdtCost, setPdtCost] = useState('');
  const [pdtAvl, setPdtAvl] = useState('');
  const [pdtRating, setPdtRating] = useState('');
  const [pdtSellerName, setPdtSellerName] = useState('');
  const [pdtImg, setPdtImage] = useState('');
  const [pdtUnique, setPdtUnique] = useState('');

  const returnPayload = async () => {
  const fetchPayload = {
        pdtName: pdtName,
        pdtQuantity: pdtQty,
        pdtDetails: pdtDetails,
        pdtCost: pdtCost,
        pdtAvl: pdtAvl,
        pdtRating: pdtRating,
        pdtSellerName: pdtSellerName,
        pdtImage: pdtImg,
        uniqueId: pdtUnique
    }
    const uploadItem = await fetch("https://ecom-backend-tdex.onrender.com/ecom/stock", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchPayload)
    })
  }

  return (
    <ScrollView>
      <ImageBackground
      source={{uri: "https://images.unsplash.com/photo-1659219997473-9c3f3570649a?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
      resizeMode="cover"
      className="h-full w-full"
      >
      <Text className="text-white text-9xl ml-8 mt-16" style={{ fontFamily: 'UrbanBold' }}>
        stock
      </Text>
      <View className="h-full w-96 rounded-xl ml-6 mt-10 p-4">
        <TextInput
          placeholder="Enter Product Name"
          className="w-80 h-16 text-3xl border border-gray-400 px-4 mt-6 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtName(text)}
        />
        <TextInput
          placeholder="Enter Product Quantity"
          className="w-80 h-14 text-2xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtQty(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter Product Details"
          className="w-80 h-16 text-2xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtDetails(text)}
        />
        <TextInput
          placeholder="Enter Product Cost"
          className="w-80 h-16 text-3xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtCost(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter Product Availability"
          className="w-80 h-16 text-2xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtAvl(text)}
        />
        <TextInput
          placeholder="Enter Product Rating"
          className="w-80 h-16 text-3xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtRating(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter Seller Name"
          className="w-80 h-16 text-3xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtSellerName(text)}
        />
        <TextInput
          placeholder="Enter Product Image URL"
          className="w-80 h-16 pt-2 text-2xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtImage(text)}
        />
        <TextInput
          placeholder="Enter Unique ID"
          className="w-80 h-16 text-3xl border border-gray-400 px-4 mt-2 bg-white rounded-xl tracking-wider"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setPdtUnique(text)}
          keyboardType="numeric"
        />
      <Pressable className="h-16 w-52 mt-6 bg-white rounded-2xl" onPress={returnPayload}>
        <Text className="text-black text-3xl pt-4 pl-2" style={{ fontFamily: 'UrbanBold' }}>Stock Product</Text>
      </Pressable>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

export default index;
