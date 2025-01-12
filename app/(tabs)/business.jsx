import { View, Text, ImageBackground, StatusBar, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const Business = () => {
  const [userName, setUserName] = useState('');
  const [signUpResp, setSignUpResp] = useState('');
  const router = useRouter(); // Initialize router

  const signUp = async () => {
    try {
      let authPayload = {
        name: userName
      };

      const signUpRequest = await fetch(
        "https://ecom-backend-tdex.onrender.com/sell/verify",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authPayload),
        }
      );

      const resp = await signUpRequest.json();
      setSignUpResp(resp.message);

      // Navigate only if response indicates success
      if (resp.message === "User Found!") {
        router.push("/(zsell)"); // Redirect to the desired route
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setSignUpResp("Something went wrong. Please try again.");
    }
  };

  return (
    <View>
      <View className="">
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1578659759806-276b46106dc8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          resizeMode="cover"
          className="h-full w-full mt-0"
        >
          <StatusBar translucent={true} backgroundColor="transparent" />
          <Text
            className="text-white text-9xl ml-6 mt-44"
            style={{ fontFamily: 'UrbanBold', fontSize: 110 }}
          >
            marketplace
          </Text>
          <TextInput
            placeholder="Enter your username"
            className="w-3/4 h-16 text-3xl border border-gray-400 px-4 mt-16 ml-6 bg-white rounded-xl tracking-wider"
            style={{ fontFamily: 'UrbanRegular' }}
            onChangeText={(user) => setUserName(user)}
          />
          <Pressable
            className="mt-10 bg-white h-14 w-32 ml-6 rounded-2xl"
            onPress={signUp}
          >
            <Text
              className="ml-5 pl-3 mt-3 text-black text-2xl"
              style={{ fontFamily: 'UrbanBold' }}
            >
              Log In
            </Text>
          </Pressable>
          <Text
            className="text-white ml-6 mt-8 text-xl"
            style={{ fontFamily: 'UrbanRegular' }}
          >
            {signUpResp}
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Business;
