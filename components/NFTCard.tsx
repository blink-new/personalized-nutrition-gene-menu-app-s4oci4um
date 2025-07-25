import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NFTData {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  dataTypes: string[];
  owner: string;
  isOwned: boolean;
  thumbnail: string;
}

interface NFTCardProps {
  nft: NFTData;
  onPress: () => void;
  onBuy?: () => void;
}

export default function NFTCard({ nft, onPress, onBuy }: NFTCardProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-start mb-3">
        <View className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mr-3 items-center justify-center">
          <Ionicons name="analytics" size={24} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">{nft.title}</Text>
          <Text className="text-sm text-gray-600 mb-2">{nft.description}</Text>
          <Text className="text-xs text-gray-500">by {nft.owner}</Text>
        </View>
        {nft.isOwned && (
          <View className="bg-green-100 px-2 py-1 rounded">
            <Text className="text-xs text-green-800 font-medium">Owned</Text>
          </View>
        )}
      </View>
      
      <View className="flex-row flex-wrap mb-3">
        {nft.dataTypes.map((type, index) => (
          <View key={index} className="bg-blue-50 px-2 py-1 rounded mr-2 mb-1">
            <Text className="text-xs text-blue-700">{type}</Text>
          </View>
        ))}
      </View>
      
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="diamond" size={16} color="#8B5CF6" />
          <Text className="text-lg font-bold text-purple-600 ml-1">
            {nft.price} {nft.currency}
          </Text>
        </View>
        
        {!nft.isOwned && onBuy && (
          <TouchableOpacity 
            onPress={onBuy}
            className="bg-purple-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium text-sm">Buy Now</Text>
          </TouchableOpacity>
        )}
        
        {nft.isOwned && (
          <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
            <Text className="text-gray-700 font-medium text-sm">Manage</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}