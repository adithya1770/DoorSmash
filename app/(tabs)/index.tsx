import { View, TextInput, Button, Pressable, Text, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

const Index = () => {

  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [signUpResp, setSignUpResp] = useState('');

  const signUp = async () => {
    let authPayload = {
      username: userName,
      password: passWord
    };

    const signUpRequest = await fetch("https://ecom-backend-tdex.onrender.com/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authPayload)
    });

    const signUpResponse = await signUpRequest.json();
    const signUpResponseNew = JSON.stringify(signUpResponse["message"]);
    setSignUpResp(signUpResponseNew.replace(/"/g, ' '));
  };

  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground source={{uri: "https://images.unsplash.com/photo-1675173503270-d5e0ec0e6fc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} resizeMode='cover' className='h-full w-full mt-40'>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <Text className='text-white text-9xl ml-6 mt-2' style={{fontFamily: 'UrbanBold', fontSize: 150}}>sign up</Text>
      <TextInput
        placeholder="Enter your username"
        className="w-3/4 h-16 border border-gray-400 px-4 mt-16 ml-6 bg-white rounded-xl tracking-wider"
        style={{fontFamily: 'UrbanRegular'}}
        onChangeText={(user) => setUserName(user)}
      />
      <TextInput
        secureTextEntry = {true}
        placeholder="Enter your Password"
        className="w-3/4 h-16 border border-gray-400 px-4 ml-6 bg-white rounded-xl mt-4 tracking-wider"
        style={{fontFamily: 'UrbanRegular'}}
        onChangeText={(pswd) => setPassWord(pswd)}
      />
      <Pressable className='mt-10 bg-white h-14 w-32 ml-6 rounded-2xl' onPress={signUp}>
          <Text className='ml-5 mt-3 text-black text-2xl' style={{fontFamily: 'UrbanBold'}}>Sign Up</Text>
      </Pressable>
      <Text className='text-white ml-6 mt-8 text-xl' style={{fontFamily: 'UrbanRegular'}}>{signUpResp}</Text>
    </ImageBackground>
    </View>
  );
};

export default Index;
