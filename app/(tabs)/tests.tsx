import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function TestsScreen() {
  
  const bloodTests = [
    {
      date: '2024-02-15',
      type: 'Comprehensive Metabolic Panel',
      status: 'completed',
      results: 'Optimal',
      nextAction: 'Continue current nutrition plan'
    },
    {
      date: '2024-03-01',
      type: 'Lipid Profile',
      status: 'scheduled',
      results: null,
      nextAction: 'Fast 12 hours before test'
    },
    {
      date: '2024-03-15',
      type: 'Vitamin D & B12',
      status: 'recommended',
      results: null,
      nextAction: 'Schedule appointment'
    },
    {
      date: '2024-04-01',
      type: 'Inflammatory Markers',
      status: 'upcoming',
      results: null,
      nextAction: 'Based on gene analysis'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981'
      case 'scheduled': return '#3B82F6'
      case 'recommended': return '#F59E0B'
      case 'upcoming': return '#8B5CF6'
      default: return '#6B7280'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'checkmark-circle'
      case 'scheduled': return 'calendar'
      case 'recommended': return 'alert-circle'
      case 'upcoming': return 'time'
      default: return 'help-circle'
    }
  }

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary pt-12 pb-6 px-6 rounded-b-3xl">
        <Text className="text-white text-2xl font-inter-medium mb-2">Blood Test Schedule</Text>
        <Text className="text-white/80 font-inter">Optimize your nutrition with regular testing</Text>
      </View>

      {/* Next Test Alert */}
      <View className="px-6 mt-6">
        <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar" size={20} color="#3B82F6" />
            <Text className="text-blue-800 font-inter-medium ml-2">Next Test Due</Text>
          </View>
          <Text className="text-blue-700 font-inter mb-3">
            Lipid Profile scheduled for March 1st, 2024
          </Text>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-xl self-start">
            <Text className="text-white font-inter-medium text-sm">Set Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Test Schedule */}
      <View className="px-6">
        <Text className="text-dark text-xl font-inter-medium mb-4">Test Schedule</Text>
        
        {bloodTests.map((test, index) => (
          <View key={index} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-dark font-inter-medium text-base">{test.type}</Text>
                <Text className="text-gray-600 font-inter text-sm">
                  {new Date(test.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons 
                  name={getStatusIcon(test.status)} 
                  size={20} 
                  color={getStatusColor(test.status)} 
                />
                <Text 
                  className="font-inter text-sm ml-1 capitalize"
                  style={{ color: getStatusColor(test.status) }}
                >
                  {test.status}
                </Text>
              </View>
            </View>
            
            {test.results && (
              <View className="bg-green-50 p-3 rounded-xl mb-3">
                <Text className="text-green-800 font-inter-medium text-sm">Results: {test.results}</Text>
              </View>
            )}
            
            <View className="bg-gray-50 p-3 rounded-xl mb-3">
              <Text className="text-gray-700 font-inter text-sm">{test.nextAction}</Text>
            </View>
            
            {test.status === 'recommended' && (
              <TouchableOpacity className="bg-accent py-2 px-4 rounded-xl">
                <Text className="text-white font-inter-medium text-center text-sm">Schedule Test</Text>
              </TouchableOpacity>
            )}
            
            {test.status === 'scheduled' && (
              <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-xl">
                <Text className="text-white font-inter-medium text-center text-sm">View Details</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* Why These Tests */}
      <View className="px-6 mt-6 mb-8">
        <Text className="text-dark text-xl font-inter-medium mb-4">Why These Tests?</Text>
        
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Ionicons name="information-circle" size={24} color="#00C851" />
            <Text className="text-dark font-inter-medium text-lg ml-3">Personalized Testing</Text>
          </View>
          
          <Text className="text-gray-700 font-inter mb-4">
            Based on your genetic profile, these tests will help optimize your nutrition plan:
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row items-start">
              <View className="w-2 h-2 bg-primary rounded-full mt-2 mr-3" />
              <Text className="text-gray-700 font-inter flex-1">
                <Text className="font-inter-medium">MTHFR variant</Text> requires monitoring folate levels
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="w-2 h-2 bg-primary rounded-full mt-2 mr-3" />
              <Text className="text-gray-700 font-inter flex-1">
                <Text className="font-inter-medium">APOE ε4</Text> increases need for cardiovascular monitoring
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="w-2 h-2 bg-primary rounded-full mt-2 mr-3" />
              <Text className="text-gray-700 font-inter flex-1">
                <Text className="font-inter-medium">FTO variant</Text> benefits from metabolic tracking
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}