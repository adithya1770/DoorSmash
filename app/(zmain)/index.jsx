import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Pressable, ScrollView, ImageBackground, Image } from 'react-native';
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
  }, []);

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

  const sort = async () => {
    const pdtDataArray = [...pdtData].sort((a, b) => a.pdtCost-b.pdtCost);
    setPdtData(pdtDataArray);
  }

  const ratingSort = async () => {
    const pdtArrayNew = [...pdtData].sort((a, b) => b.pdtAvgRating - a.pdtAvgRating);
    setPdtData(pdtArrayNew);
  }

  const popularSort = async () => {
    const pdtArrayNew = [...pdtData].sort((a, b) => b.appealFactor - a.appealFactor);
    setPdtData(pdtArrayNew);
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/f1/24/0d/f1240dfe0560bbfa45b66954482ea634.jpg",
        }}
        resizeMode="cover"
        className="h-full w-full"
      >
        <StatusBar translucent={true} backgroundColor="transparent" />
        <TextInput
          className="h-14 w-96 mt-12 ml-6 rounded-t-2xl bg-white pl-4 text-2xl"
          placeholder="search now"
          style={{ fontFamily: 'UrbanRegular' }}
          onChangeText={(text) => setSearch(text)}
        />

        <Pressable className="bg-white h-10 rounded-b-2xl w-32 ml-6 pl-4 mt-2">
          <Text style={{ fontFamily: 'UrbanBold' }} className="text-3xl" onPress={searchBtn}>
            search
          </Text>
        </Pressable>

        <Pressable className="bg-white h-10 rounded-b-2xl w-14 right-8 pl-4 absolute top-28">
          <Text style={{ fontFamily: 'UrbanBold' }} className="text-3xl" onPress={sort}>
            <Ionicons name="cash" size={20} color="golden"/>
          </Text>
        </Pressable>

        <Pressable className="bg-white h-10 rounded-b-2xl w-14 right-24 pl-4 absolute top-28">
          <Text style={{ fontFamily: 'UrbanBold' }} className="text-3xl" onPress={ratingSort}>
            <Ionicons name="star" size={20} color="golden"/>
          </Text>
        </Pressable>

        <Pressable className="bg-white h-10 rounded-b-2xl w-14 right-40 pl-4 absolute top-28">
          <Text style={{ fontFamily: 'UrbanBold' }} className="text-3xl" onPress={popularSort}>
            <Ionicons name="trending-up" size={20} color="golden"/>
          </Text>
        </Pressable>

        <Text className="text-2xl text-white ml-7 mt-4" style={{ fontFamily: 'UrbanBold' }}>
          {search}
        </Text>

        <ScrollView className="mt-10 overflow-y-scroll">
          <View>
            {pdtData.map((data, index) => (
              <View
                key={index}
                className="bg-black border-white border-2 h-110 w-96 rounded-xl p-4 mt-4 ml-6 shadow-lg"
              >
                <Image source={{ uri: data.pdtImage }} style={{ width: 300, height: 300, borderRadius: 20, marginLeft: 5 }}/>
                <Text className="text-6xl text-white mt-4" style={{ fontFamily: 'UrbanBold' }}>
                  {data.pdtName}
                </Text>
                <Text className="text-sm text-white text-primary mt-2" style={{ fontFamily: 'UrbanRegular' }}>
                  Product ID - {data._id}
                </Text>
                <Text className="text-xl text-white mt-2" style={{ fontFamily: 'UrbanBold' }}>
                  {data.pdtDetails}
                </Text>
                <Text className="text-4xl text-white text-primary mt-2" style={{ fontFamily: 'UrbanBold' }}>
                  Rs. {data.pdtCost}
                </Text>
                <Text className="text-xl text-primary mt-2" style={{ fontFamily: 'UrbanRegular' }}>
                  {data.pdtAvl === "In Stock"?<Text className='text-green-700'>In Stock</Text>:<Text className='text-red-500'>Out of Stock</Text>}
                </Text>
                <Text className="text-xl text-white text-primary mt-2" style={{ fontFamily: 'UrbanBold' }}>
                  Seller - {data.pdtSellerName}
                </Text>
                <Text className="text-xl text-primary mt-2 text-yellow-500" style={{ fontFamily: 'UrbanBold' }}>
                  <Ionicons name="star" size={20} color="golden" /> Rated {Number(data.pdtAvgRating.toFixed(1))} out of 5
                </Text>
                {onClick ? (
                  <View className="h-auto mt-4 w-80 rounded-2xl ml-3 bg-gray-900 p-4 shadow-lg">
                  <Pressable
                    className="absolute top-3 right-3"
                    onPress={onClicker}
                  >
                    <Ionicons size={24} name="close" color="white" />
                  </Pressable>
                
                  <Text className="text-white text-lg mb-4" style={{ fontFamily: 'UrbanBold' }}>
                    Add Your Comment
                  </Text>
                  <View className="flex-row items-center mb-4">
                    <TextInput
                      className="flex-1 h-12 bg-white rounded-lg px-4"
                      placeholder="Write a comment..."
                      placeholderTextColor="gray"
                      style={{ fontFamily: 'UrbanRegular' }}
                      onChangeText={(text) => setComment(text)}
                    />
                    <Pressable
                      className="ml-3 bg-primary p-3 rounded-full"
                      onPress={() => sendComment(comment, data.pdtSellerName, data.pdtName)}
                    >
                      <Ionicons name="send" color="white" size={20} />
                    </Pressable>
                  </View>
                  <Text className="text-white text-lg mt-4 mb-2" style={{ fontFamily: 'UrbanBold' }}>
                    Comments
                  </Text>
                    <ScrollView className='overflow-y-scroll'>
                      {data.pdtComments && data.pdtComments.length > 0 ? (
                        data.pdtComments.map((comment, index) => (
                          <View
                            key={index}
                            className="mb-3 p-3 bg-gray-700 rounded-lg"
                          >
                            <Text
                              className="text-white text-sm"
                              style={{ fontFamily: 'UrbanRegular' }}
                            >
                              {comment}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <Text
                          className="text-gray-400 text-sm text-center"
                          style={{ fontFamily: 'UrbanItalic' }}
                        >
                          No comments yet. Be the first to add one!
                        </Text>
                      )}
                    </ScrollView>
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
