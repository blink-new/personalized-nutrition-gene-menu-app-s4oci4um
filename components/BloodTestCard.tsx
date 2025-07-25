import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BloodTest {
  name: string;
  date: string;
  status: 'upcoming' | 'completed' | 'overdue';
  importance: 'High' | 'Medium' | 'Low';
  description: string;
  relatedGenes: string[];
}

interface BloodTestCardProps {
  test: BloodTest;
  onSchedule: () => void;
}

export default function BloodTestCard({ test, onSchedule }: BloodTestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return 'time';
      case 'completed': return 'checkmark-circle';
      case 'overdue': return 'alert-circle';
      default: return 'information-circle';
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View className={`w-3 h-3 rounded-full mr-2 ${getImportanceColor(test.importance)}`} />
          <Text className="text-lg font-bold text-gray-900">{test.name}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full flex-row items-center ${getStatusColor(test.status)}`}>
          <Ionicons 
            name={getStatusIcon(test.status) as any} 
            size={14} 
            color={test.status === 'completed' ? '#166534' : test.status === 'upcoming' ? '#1e40af' : '#991b1b'} 
          />
          <Text className={`text-xs font-medium ml-1 capitalize ${test.status === 'completed' ? 'text-green-800' : test.status === 'upcoming' ? 'text-blue-800' : 'text-red-800'}`}>
            {test.status}
          </Text>
        </View>
      </View>
      
      <Text className="text-sm text-gray-500 mb-2">{test.date}</Text>
      <Text className="text-sm text-gray-600 mb-3">{test.description}</Text>
      
      <View className="flex-row flex-wrap mb-3">
        {test.relatedGenes.map((gene, index) => (
          <View key={index} className="bg-purple-50 px-2 py-1 rounded mr-2 mb-1">
            <Text className="text-xs text-purple-700">{gene}</Text>
          </View>
        ))}
      </View>
      
      {test.status !== 'completed' && (
        <TouchableOpacity 
          onPress={onSchedule}
          className="bg-green-500 rounded-lg py-2 flex-row items-center justify-center"
        >
          <Ionicons name="calendar" size={16} color="white" />
          <Text className="text-white font-medium ml-2">
            {test.status === 'overdue' ? 'Schedule Now' : 'Reschedule'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}