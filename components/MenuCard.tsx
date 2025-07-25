import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  name: string;
  ingredients: string[];
  benefits: string;
  calories: number;
}

interface MenuCardProps {
  meal: string;
  item: MenuItem;
  onOrder: () => void;
}

export default function MenuCard({ meal, item, onOrder }: MenuCardProps) {
  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          <Text className="text-lg font-semibold text-gray-800">{meal}</Text>
        </View>
        <Text className="text-sm text-gray-500">{item.calories} cal</Text>
      </View>
      
      <Text className="text-xl font-bold text-gray-900 mb-2">{item.name}</Text>
      
      <View className="mb-3">
        <Text className="text-sm font-medium text-gray-700 mb-1">Ingredients:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {item.ingredients.map((ingredient, index) => (
              <View key={index} className="bg-green-50 px-3 py-1 rounded-full mr-2">
                <Text className="text-xs text-green-700">{ingredient}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">Benefits:</Text>
        <Text className="text-sm text-gray-600">{item.benefits}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onOrder}
        className="bg-orange-500 rounded-lg py-3 flex-row items-center justify-center"
      >
        <Ionicons name="bag-add" size={20} color="white" />
        <Text className="text-white font-semibold ml-2">Order from Amazon Fresh</Text>
      </TouchableOpacity>
    </View>
  );
}