import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GeneVariant {
  gene: string;
  variant: string;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
  recommendations: string[];
}

interface GeneVariantCardProps {
  variant: GeneVariant;
  onPress: () => void;
}

export default function GeneVariantCard({ variant, onPress }: GeneVariantCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return 'checkmark-circle';
      case 'Medium': return 'warning';
      case 'High': return 'alert-circle';
      default: return 'information-circle';
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-gray-900">{variant.gene}</Text>
          <Text className="text-sm text-gray-500 ml-2">({variant.variant})</Text>
        </View>
        <View className={`px-3 py-1 rounded-full flex-row items-center ${getRiskColor(variant.risk)}`}>
          <Ionicons 
            name={getRiskIcon(variant.risk) as any} 
            size={14} 
            color={variant.risk === 'Low' ? '#166534' : variant.risk === 'Medium' ? '#92400e' : '#991b1b'} 
          />
          <Text className={`text-xs font-medium ml-1 ${variant.risk === 'Low' ? 'text-green-800' : variant.risk === 'Medium' ? 'text-yellow-800' : 'text-red-800'}`}>
            {variant.risk}
          </Text>
        </View>
      </View>
      
      <Text className="text-sm text-gray-600 mb-3">{variant.description}</Text>
      
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-gray-500">
          {variant.recommendations.length} recommendations
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}