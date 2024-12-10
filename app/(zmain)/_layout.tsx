import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs screenOptions={{tabBarStyle: {backgroundColor: "#000000", borderTopWidth: 0}}}>
        <Tabs.Screen name="index" options={{title: 'Home', tabBarIcon: ({color, size}) => <Ionicons name="home" size={24} color="white"/>, headerShown: false, tabBarLabelStyle: { fontFamily: 'UrbanBold' ,fontSize: 10, color: "white"}}}/>
        <Tabs.Screen name="wishlist" options={{title: 'Cart', tabBarIcon: ({color, size}) => <Ionicons name="cart" size={24} color="white"/>, headerShown: false, tabBarLabelStyle: { fontFamily: 'UrbanBold' ,fontSize: 10, color: "white"}}}/>
    </Tabs>
  )
}

export default _layout