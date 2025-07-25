import { useEffect } from 'react'
import { router } from 'expo-router'

export default function Index() {
  useEffect(() => {
    // Redirect to tabs
    router.replace('/(tabs)')
  }, [])

  return null
}