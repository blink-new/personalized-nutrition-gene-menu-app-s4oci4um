import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BloodTestCard from '../../components/BloodTestCard';

interface BloodTest {
  name: string;
  date: string;
  status: 'upcoming' | 'completed' | 'overdue';
  importance: 'High' | 'Medium' | 'Low';
  description: string;
  relatedGenes: string[];
}

export default function TestsScreen() {
  const [tests, setTests] = useState<BloodTest[]>([
    {
      name: 'Homocysteine Level',
      date: 'Jan 28, 2024',
      status: 'upcoming',
      importance: 'High',
      description: 'Measures homocysteine levels to assess MTHFR gene function and cardiovascular risk.',
      relatedGenes: ['MTHFR', 'CBS']
    },
    {
      name: 'Lipid Panel Extended',
      date: 'Jan 15, 2024',
      status: 'overdue',
      importance: 'High',
      description: 'Comprehensive cholesterol analysis including particle size for APOE variant assessment.',
      relatedGenes: ['APOE', 'LDLR']
    },
    {
      name: 'Vitamin B12 & Folate',
      date: 'Dec 20, 2023',
      status: 'completed',
      importance: 'Medium',
      description: 'Assesses B-vitamin status crucial for methylation pathways.',
      relatedGenes: ['MTHFR', 'MTR']
    },
    {
      name: 'Inflammatory Markers',
      date: 'Feb 10, 2024',
      status: 'upcoming',
      importance: 'Medium',
      description: 'CRP, IL-6, and TNF-α to assess inflammatory response based on genetic variants.',
      relatedGenes: ['IL6', 'TNF', 'CRP']
    },
    {
      name: 'Glucose & Insulin Response',
      date: 'Feb 5, 2024',
      status: 'upcoming',
      importance: 'Medium',
      description: 'Evaluates metabolic function related to FTO gene variant.',
      relatedGenes: ['FTO', 'TCF7L2']
    }
  ]);

  const handleScheduleTest = (testName: string) => {
    Alert.alert(
      "Schedule Blood Test",
      `Would you like to schedule "${testName}" at your preferred lab?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Schedule", 
          onPress: () => {
            Alert.alert("Success!", "Your blood test has been scheduled. You'll receive a confirmation email shortly.");
            // Update test status
            setTests(prevTests => 
              prevTests.map(test => 
                test.name === testName 
                  ? { ...test, status: 'upcoming' as const, date: 'Feb 15, 2024' }
                  : test
              )
            );
          }
        }
      ]
    );
  };

  const upcomingTests = tests.filter(test => test.status === 'upcoming');
  const overdueTests = tests.filter(test => test.status === 'overdue');
  const completedTests = tests.filter(test => test.status === 'completed');

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-500 pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-semibold mb-2">Blood Test Schedule</Text>
        <Text className="text-white/80">Optimize your nutrition based on genetic markers</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Test Summary */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="text-gray-900 font-semibold text-lg mb-3">Test Overview</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-500">{upcomingTests.length}</Text>
              <Text className="text-sm text-gray-600">Upcoming</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-red-500">{overdueTests.length}</Text>
              <Text className="text-sm text-gray-600">Overdue</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-500">{completedTests.length}</Text>
              <Text className="text-sm text-gray-600">Completed</Text>
            </View>
          </View>
        </View>

        {/* Overdue Tests */}
        {overdueTests.length > 0 && (
          <>
            <View className="flex-row items-center mb-3">
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <Text className="text-red-600 font-semibold text-lg ml-2">Overdue Tests</Text>
            </View>
            {overdueTests.map((test, index) => (
              <BloodTestCard 
                key={`overdue-${index}`}
                test={test}
                onSchedule={() => handleScheduleTest(test.name)}
              />
            ))}
          </>
        )}

        {/* Upcoming Tests */}
        {upcomingTests.length > 0 && (
          <>
            <View className="flex-row items-center mb-3 mt-4">
              <Ionicons name="time" size={20} color="#3B82F6" />
              <Text className="text-blue-600 font-semibold text-lg ml-2">Upcoming Tests</Text>
            </View>
            {upcomingTests.map((test, index) => (
              <BloodTestCard 
                key={`upcoming-${index}`}
                test={test}
                onSchedule={() => handleScheduleTest(test.name)}
              />
            ))}
          </>
        )}

        {/* Completed Tests */}
        {completedTests.length > 0 && (
          <>
            <View className="flex-row items-center mb-3 mt-4">
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text className="text-green-600 font-semibold text-lg ml-2">Completed Tests</Text>
            </View>
            {completedTests.map((test, index) => (
              <BloodTestCard 
                key={`completed-${index}`}
                test={test}
                onSchedule={() => handleScheduleTest(test.name)}
              />
            ))}
          </>
        )}

        {/* Why These Tests Matter */}
        <View className="bg-white rounded-xl p-4 mt-6 mb-8 shadow-sm border border-gray-100">
          <Text className="text-gray-900 font-semibold text-lg mb-3">Why These Tests Matter</Text>
          
          <View className="mb-3">
            <Text className="text-gray-900 font-medium mb-1">🧬 Genetic Optimization</Text>
            <Text className="text-gray-600 text-sm">These tests help us understand how your genetic variants are affecting your health and nutrition needs.</Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-900 font-medium mb-1">🍎 Personalized Nutrition</Text>
            <Text className="text-gray-600 text-sm">Results guide our AI to create more targeted meal recommendations for your unique genetic profile.</Text>
          </View>
          
          <View>
            <Text className="text-gray-900 font-medium mb-1">📈 Health Tracking</Text>
            <Text className="text-gray-600 text-sm">Regular monitoring helps track improvements and adjust your nutrition plan over time.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}