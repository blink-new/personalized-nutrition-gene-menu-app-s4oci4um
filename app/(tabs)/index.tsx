import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { blink } from '../../src/blink/client'

export default function HomeScreen() {
  const [user, setUser] = useState(null)
  const [todayMenu] = useState({
    breakfast: 'Blueberry & Spinach Smoothie Bowl',
    lunch: 'Quinoa Kale Salad with Avocado',
    dinner: 'Roasted Sweet Potato & Broccoli'
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const nextBloodTest = new Date()
  nextBloodTest.setDate(nextBloodTest.getDate() + 14)

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary pt-12 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-lg font-inter">Good morning,</Text>
            <Text className="text-white text-2xl font-inter-medium">
              {user?.email?.split('@')[0] || 'User'}
            </Text>
          </View>
          <TouchableOpacity className="bg-white/20 p-3 rounded-full">
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View className="bg-white/10 p-4 rounded-2xl">
          <Text className="text-white text-sm font-inter mb-1">Your genetic profile shows</Text>
          <Text className="text-white text-lg font-inter-medium">
            High antioxidant needs
          </Text>
        </View>
      </View>

      {/* Today's Menu Preview */}
      <View className="px-6 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-dark text-xl font-inter-medium">Today's Menu</Text>
          <TouchableOpacity>
            <Text className="text-primary font-inter-medium">View All</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Ionicons name="sunny" size={20} color="#FF6B35" />
            <Text className="text-dark font-inter-medium ml-2">Breakfast</Text>
          </View>
          <Text className="text-gray-600 font-inter mb-4">{todayMenu.breakfast}</Text>
          
          <TouchableOpacity className="bg-accent py-3 px-4 rounded-xl flex-row items-center justify-center">
            <Ionicons name="bag" size={18} color="white" />
            <Text className="text-white font-inter-medium ml-2">Order from Amazon Fresh</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View className="px-6 mt-6">
        <Text className="text-dark text-xl font-inter-medium mb-4">Health Overview</Text>
        
        <View className="flex-row justify-between">
          <View className="bg-white rounded-2xl p-4 flex-1 mr-3 shadow-sm">
            <Ionicons name="fitness" size={24} color="#00C851" />
            <Text className="text-2xl font-inter-medium text-dark mt-2">92%</Text>
            <Text className="text-gray-600 font-inter text-sm">Nutrition Score</Text>
          </View>
          
          <View className="bg-white rounded-2xl p-4 flex-1 shadow-sm">
            <Ionicons name="calendar" size={24} color="#FF6B35" />
            <Text className="text-sm font-inter-medium text-dark mt-2">
              {nextBloodTest.toLocaleDateString()}
            </Text>
            <Text className="text-gray-600 font-inter text-sm">Next Blood Test</Text>
          </View>
        </View>
      </View>

      {/* NFT Earnings */}
      <View className="px-6 mt-6 mb-8">
        <View className="bg-purple-500 rounded-2xl p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white font-inter-medium text-lg">NFT Earnings</Text>
              <Text className="text-white/80 font-inter text-sm">Your health data value</Text>
            </View>
            <View className="items-end">
              <Text className="text-white text-2xl font-inter-medium">$247</Text>
              <Text className="text-white/80 font-inter text-sm">This month</Text>
            </View>
          </View>
          
          <TouchableOpacity className="bg-white/20 py-2 px-4 rounded-xl mt-3 self-start">
            <Text className="text-white font-inter-medium text-sm">View Marketplace</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}