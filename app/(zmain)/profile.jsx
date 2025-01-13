import { View, Text, Image, Pressable, Linking } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const profile = () => {

  const LinkedinRedirect = () => {
    Linking.openURL("https://www.linkedin.com/in/adithyaps929/");
  }

  const GitRedirect = () => {
    Linking.openURL("https://github.com/adithya1770");
  }

  const cc = () => {
    Linking.openURL("https://projectpathways.vercel.app/");
  }
  return (
    <View>
      <Text className="text-white text-9xl mt-12 pt-2 ml-8" style={{fontFamily: 'UrbanBold'}}>dev profile</Text>
      <Image source={{uri: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_2x3.jpg"}} style={{width: 100, height: 100, borderRadius: 50, marginLeft: 135, marginTop: 30}}/>
      <Text className="text-white text-5xl mt-2 pt-2 ml-20" style={{fontFamily: 'UrbanBold'}}>Adithya P S</Text>
      <View className="h-96 w-96 ml-7 mt-10 rounded-t-2xl bg-gray-900">
        <View className="flex-row bg-gray-800 h-22 w-80 ml-8 mt-4 rounded-2xl">
          <Pressable onPress={LinkedinRedirect}>
            <Ionicons name="logo-linkedin" size={80}/>
          </Pressable>
          <Pressable onPress={GitRedirect} className="absolute left-28">
            <Ionicons name="logo-github" size={80}/>
          </Pressable>
          <Pressable onPress={cc} className="absolute left-56">
            <Ionicons name="globe" size={80}/>
          </Pressable>
        </View>
        <Text className="text-black text-3xl mt-2 pt-2 ml-28" style={{fontFamily: 'UrbanBold'}}>made using</Text>
        <View className="flex-row">
            <Ionicons name="logo-nodejs" size={100}/>
            <Ionicons name="logo-javascript" size={100} style={{marginLeft: 10}}/>
            <Ionicons name="logo-npm" size={100} style={{marginLeft: 12}}/>
        </View>
      </View>
    </View>
  )
}

export default profile