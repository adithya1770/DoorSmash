import { View, TextInput, Button, Pressable, Text, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { MyContext } from '../context';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [signInResp, setSignInResp] = useState('');
  const { name, setName } = useContext(MyContext);
  const router = useRouter();

  const signIn = async () => {
    const signInPayload = {
      username: userName,
      password: passWord
    }
    const signInRequest = await fetch("https://ecom-backend-tdex.onrender.com/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signInPayload)
    })

    const signInResponse = await signInRequest.json();
    const signInResponseNew = JSON.stringify(signInResponse["message"]);
    setSignInResp(signInResponseNew.replace(/"/g, ' '));
    if(signInResponse['sid'] && signInResponse['clientToken']){
      setName(signInResponse['username']);
      router.push("/(zmain)");
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground source={{uri: "https://images.unsplash.com/photo-1675173503270-d5e0ec0e6fc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} resizeMode='cover' className='h-full w-full mt-40'>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <Text className='text-white text-9xl ml-6 mt-4' style={{fontFamily: 'UrbanBold', fontSize: 150}}>log in</Text>
      <TextInput
        placeholder="Enter your username"
        className="w-3/4 text-3xl h-16 border border-gray-400 px-4 mt-14 ml-6 bg-white rounded-xl tracking-wider"
        style={{fontFamily: 'UrbanRegular'}}
        onChangeText={(user) => setUserName(user)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Enter your Password"
        className="w-3/4 text-3xl h-16 border border-gray-400 px-4 ml-6 bg-white rounded-xl mt-4 tracking-wider"
        style={{fontFamily: 'UrbanRegular'}}
        onChangeText={(pswd) => setPassWord(pswd)}
      />
      <Pressable className='mt-10 bg-white h-14 w-28 ml-6 rounded-2xl'>
          <Text className='ml-5 mt-3 text-black text-2xl' style={{fontFamily: 'UrbanBold'}} onPress={signIn}>Log in</Text>
      </Pressable>
      <Text className='text-white ml-6 mt-8 text-xl' style={{fontFamily: 'UrbanRegular'}}>{signInResp}</Text>
    </ImageBackground>
    </View>
  );
};

export default Signin;
