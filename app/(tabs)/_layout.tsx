import { View, Text } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
          <Tabs screenOptions={{tabBarStyle: {backgroundColor: "#000000", borderTopWidth: 0}}}>
              <Tabs.Screen name="index" options={{title: "Sign Up", tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={24} color="white" />, headerShown: false, tabBarLabelStyle: {fontFamily: 'UrbanBold', fontSize: 10, color: "white"}}} />
              <Tabs.Screen name="signin" options={{title: "Sign In", tabBarIcon: ({color, size}) => <Ionicons name="log-in" color="white" size={24}/>, headerShown: false, tabBarLabelStyle: {fontFamily: 'UrbanBold', fontSize: 10, color: "white"}}}/>
              <Tabs.Screen name="business" options={{title: "Business", tabBarIcon: ({color, size}) => <Ionicons name="business" color="white" size={24}/>, headerShown: false, tabBarLabelStyle: {fontFamily: 'UrbanBold', fontSize: 10, color: "white"}}}/>
          </Tabs>
  )
}

export default _layout