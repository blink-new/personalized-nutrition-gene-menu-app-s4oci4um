import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { blink } from '../src/blink/client'
import '../global.css'

export default function RootLayout() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-lg font-inter-medium text-dark">Loading NutriGene...</Text>
      </View>
    )
  }

  if (!user) {
    return (
      <View className="flex-1 bg-background justify-center items-center px-6">
        <Text className="text-2xl font-inter-medium text-dark mb-4 text-center">
          Welcome to NutriGene
        </Text>
        <Text className="text-base font-inter text-gray-600 text-center mb-8">
          Personalized nutrition based on your genetic profile
        </Text>
        <Text className="text-sm font-inter text-gray-500 text-center">
          Please sign in to continue
        </Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}