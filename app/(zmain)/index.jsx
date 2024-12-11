import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Pressable, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const index = () => {
  const [pdtData, setPdtData] = useState([]);
  const [onClick, setOnClick] = useState(false);
  const [comment, setComment] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const productFetch = async () => {
      const productRoute = await fetch("https://ecom-backend-tdex.onrender.com/ecom/check");
      const productRouteNew = await productRoute.json();
      setPdtData(productRouteNew);
    };
    productFetch();
  }, []); // Add an empty dependency array to avoid infinite calls.

  const addToCart = async (pdtName) => {
    await fetch("https://ecom-backend-tdex.onrender.com/wishlist/addproduct", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: pdtName }),
    });
  };

  const onClicker = () => {
    setOnClick((prevState) => !prevState);
  };

  const sendComment = async (commentN, sellerN, name) => {
    const commentPayload = {
      product: name,
      seller: sellerN,
      comment: commentN,
    };
    await fetch("https://ecom-backend-tdex.onrender.com/review/comment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentPayload),
    });
  };

  const searchBtn = async () => {
    const searchResult = await fetch("https://ecom-backend-tdex.onrender.com/ecom/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: search }),
    });
    const responseSearch = await searchResult.json();
    setSearch(responseSearch["result"][0]);
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1675937338184-3d8d8f2e94b3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
        }}
        resizeMode="cover"
        className="h-full w-full"
      >
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Text className="text-9xl text-white mt-20 ml-4" style={{ fontFamily: "UrbanBold" }}>
          Home
        </Text>

        <TextInput
          className="h-14 w-80 mt-2 ml-5 rounded-2xl bg-white pl-4 text-2xl"
          placeholder="search now"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setSearch(text)}
        />

        <Pressable className="bg-white h-10 rounded-e-2xl w-32 ml-6 pl-4 mt-2">
          <Text style={{ fontFamily: 'UrbanBold' }} className="text-3xl" onPress={searchBtn}>
            search
          </Text>
        </Pressable>

        <Text className="text-2xl text-white ml-10 mt-14" style={{ fontFamily: 'UrbanBold' }}>
          Search Result : {search}
        </Text>

        <ScrollView className="mt-10 overflow-y-scroll">
          <View>
            {pdtData.map((data, index) => (
              <View
                key={index}
                className="bg-white h-96 w-96 rounded-xl p-4 mt-4 ml-6 shadow-lg"
              >
                <Text className="text-2xl text-black" style={{ fontFamily: 'UrbanBold' }}>
                  {data.pdtName}
                </Text>
                <Text className="text-lg text-gray-700 mt-2" style={{ fontFamily: 'UrbanItalic' }}>
                  {data.pdtDetails}
                </Text>
                <Text className="text-xl text-primary mt-2" style={{ fontFamily: 'UrbanBold' }}>
                  Rs. {data.pdtCost}
                </Text>
                <Text className="text-xl text-primary mt-2" style={{ fontFamily: 'UrbanRegular' }}>
                  {data.pdtAvl}
                </Text>
                <Text className="text-xl text-primary mt-2" style={{ fontFamily: 'UrbanRegular' }}>
                  {data._id}
                </Text>
                <Text className="text-xl text-primary mt-2" style={{ fontFamily: 'UrbanBold' }}>
                  Seller - {data.pdtSellerName}
                </Text>
                <Text className="text-xl text-primary mt-2 " style={{ fontFamily: 'UrbanBold' }}>
                  <Ionicons name="star" size={14} color="black" /> Rated {data.pdtAvgRating} out of
                  5
                </Text>
                {onClick ? (
                  <View className="h-28 mt-2 w-80 rounded-xl ml-3 bg-black">
                    <Pressable className="ml-72" onPress={onClicker}>
                      <Ionicons size={20} name="close" color="white" />
                    </Pressable>
                    <Text className="text-white text-xl ml-3" style={{ fontFamily: 'UrbanRegular' }}>
                      {data.pdtComments}
                    </Text>
                    <TextInput
                      className="h-10 w-40 ml-3 mt-1 bg-white rounded-2xl"
                      placeholder="comment here"
                      style={{ fontFamily: 'UrbanRegular' }}
                      onChangeText={(text) => setComment(text)}
                    ></TextInput>
                    <Pressable
                      className="ml-48 top-16 absolute"
                      onPress={() => sendComment(comment, data.pdtSellerName, data.pdtName)}
                    >
                      <Ionicons name="send" color="white" size={25} />
                    </Pressable>
                  </View>
                ) : null}
                <View className="flex-row justify-between items-center">
                  <Pressable
                    className="bg-primary h-10 mt-2 rounded-xl justify-center items-center"
                    onPress={() => addToCart(data.pdtName)}
                  >
                    <Text
                      className="text-white text-lg h-10 w-32 pl-4 rounded-2xl pt-1 mt-4 bg-black"
                      style={{ fontFamily: 'UrbanBold' }}
                    >
                      Add to Cart
                    </Text>
                  </Pressable>
                  <Pressable
                    className="bg-primary h-10 mt-2 rounded-xl justify-center items-center"
                    onPress={onClicker}
                  >
                    <Text
                      className="text-white text-lg h-10 w-32 pl-4 rounded-2xl pt-1 mt-4 bg-black"
                      style={{ fontFamily: 'UrbanBold' }}
                    >
                      Comments
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default index;
