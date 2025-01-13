import { View, Text, Pressable, TextInput, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

const contact = () => {
  const [search, setSearch] = useState('');
  const [password, setPswd] = useState('');
  const [userResp, setUserResp] = useState('');
  const [newP, setNewP] = useState('');
  const router = useRouter();

  const updateUserName = async () => {
    const changePayload = {
      name: search
    }
    const userReq = await fetch("https://ecom-backend-tdex.onrender.com/auth/changeuser", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePayload)
    })
    const retriveResp = await userReq.json();
    setUserResp(JSON.stringify(retriveResp.message));
    router.push("/(tabs)");
  }

  const updateDetails = async() => {
    const changePayload = {
      username: search,
      password: password,
      changedPassword: newP
    }
    const userReq = await fetch("https://ecom-backend-tdex.onrender.com/auth/change", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePayload)
    })
    const retriveResp = await userReq.json();
    setUserResp(JSON.stringify(retriveResp.message));
  }

  const logout = async () => {
    fetch("https://ecom-backend-tdex.onrender.com/auth/logout");
    router.push("(tabs)");
  }
  return (
    <ScrollView>
      <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/85/9b/86/859b86944f6437b5b01590968aac08d4.jpg",
      }}
      resizeMode="cover"
      className="h-full w-full"
      >
      <Text className="text-7xl text-white mt-14 ml-8" style={{fontFamily: "UrbanBold"}}>update  username</Text>
      <TextInput
                className="h-14 w-96 mt-12 ml-6 rounded-t-2xl bg-white pl-4 text-2xl"
                placeholder="enter your new username"
                style={{ fontFamily: 'UrbanRegular' }}
                onChangeText={(user) => setSearch(user)} 
      />
      <Pressable className="h-14 ml-6 w-32 bg-gray-500 rounded-b-xl" onPress={updateUserName}>
        <Text className="text-2xl text-white mt-3 ml-5" style={{fontFamily: "UrbanBold"}}>Update</Text>
      </Pressable>
      <Text className="text-2xl text-white mt-3 ml-7" style={{fontFamily: "UrbanRegular"}}>{userResp}</Text>
      <Text className="text-7xl text-white mt-14 ml-8" style={{fontFamily: "UrbanBold"}}>update  password</Text>
      <TextInput
                className="h-14 w-96 mt-12 ml-6 rounded-2xl bg-white pl-4 text-2xl"
                placeholder="enter your current username"
                style={{ fontFamily: 'UrbanRegular' }}
                onChangeText={(user) => setSearch(user)} 
      />
      <TextInput
                className="h-14 w-96 mt-2 ml-6 rounded-2xl bg-white pl-4 text-2xl"
                placeholder="enter your current password"
                style={{ fontFamily: 'UrbanRegular' }}
                onChangeText={(user) => setPswd(user)} 
      />
      <TextInput
                className="h-14 w-96 mt-2 ml-6 rounded-t-2xl bg-white pl-4 text-2xl"
                placeholder="enter your new password"
                style={{ fontFamily: 'UrbanRegular' }}
                onChangeText={(user) => setNewP(user)} 
      />
      <Pressable className="h-14 ml-6 w-32 bg-gray-500 rounded-b-xl" onPress={updateDetails}>
        <Text className="text-2xl text-white mt-3 ml-5" style={{fontFamily: "UrbanBold"}}>Update</Text>
      </Pressable>
      <Text className="text-2xl text-white mt-3 ml-7" style={{fontFamily: "UrbanRegular"}}>{userResp}</Text>

      <Pressable className="mb-5 mt-10 h-20 w-40 bg-red-600 ml-32 rounded-3xl" onPress={logout}>
        <Text className="text-4xl text-white mt-6 ml-4" style={{fontFamily: "UrbanBold"}}>Log Out</Text>
      </Pressable>
      </ImageBackground>
    </ScrollView>
  )
}

export default contact