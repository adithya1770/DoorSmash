import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
          <Tabs screenOptions={{tabBarStyle: {backgroundColor: "#000000", borderTopWidth: 0}}}>
              <Tabs.Screen name="index" options={{title: "Stock", tabBarIcon: ({ color, size }) => <Ionicons name="cube" size={24} color="white" />, headerShown: false, tabBarLabelStyle: {fontFamily: 'UrbanBold', fontSize: 10, color: "white"}}} />
              <Tabs.Screen name="list" options={{title: "Inventory", tabBarIcon: ({ color, size }) => <Ionicons name="save" size={23} color="white" />, headerShown: false, tabBarLabelStyle: {fontFamily: 'UrbanBold', fontSize: 10, color: "white"}}} />
              <Tabs.Screen name="delete" options={{title: "DeStock", tabBarIcon: ({ color, size }) => <Ionicons name="arrow-down" size={24} color="white" />, headerShown: false, tabBarLabelStyle: {fontFamily: 'UrbanBold', fontSize: 10, color: "white"}}} />
          </Tabs>
  )
}

export default _layout