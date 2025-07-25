import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NFTCard from '../../components/NFTCard';

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

export default function NFTScreen() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'create' | 'owned'>('marketplace');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [nftTitle, setNftTitle] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [floorPrice, setFloorPrice] = useState('');

  const [marketplaceNFTs] = useState<NFTData[]>([
    {
      id: '1',
      title: 'APOE4 Carrier Health Data',
      description: '2 years of nutrition and blood test data from APOE4 carrier',
      price: 0.5,
      currency: 'ETH',
      dataTypes: ['Blood Tests', 'Nutrition', 'Exercise', 'Sleep'],
      owner: 'HealthUser123',
      isOwned: false,
      thumbnail: ''
    },
    {
      id: '2',
      title: 'MTHFR Variant Optimization Journey',
      description: 'Complete methylation support protocol with results',
      price: 0.3,
      currency: 'ETH',
      dataTypes: ['Gene Analysis', 'Supplements', 'Diet Changes'],
      owner: 'BiohackerPro',
      isOwned: false,
      thumbnail: ''
    },
    {
      id: '3',
      title: 'Mediterranean Diet Success Story',
      description: '18-month transformation with genetic-based nutrition',
      price: 0.8,
      currency: 'ETH',
      dataTypes: ['Meal Plans', 'Blood Markers', 'Weight Loss'],
      owner: 'WellnessGuru',
      isOwned: false,
      thumbnail: ''
    }
  ]);

  const [ownedNFTs] = useState<NFTData[]>([
    {
      id: 'owned1',
      title: 'My Genetic Health Journey',
      description: 'Personal health optimization data with MTHFR and APOE variants',
      price: 1.2,
      currency: 'ETH',
      dataTypes: ['Gene Profile', 'Blood Tests', 'Nutrition', 'Supplements'],
      owner: 'You',
      isOwned: true,
      thumbnail: ''
    }
  ]);

  const handleCreateNFT = () => {
    if (!nftTitle || !nftDescription || !floorPrice) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Create NFT',
      `Create "${nftTitle}" with floor price of ${floorPrice} ETH?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create',
          onPress: () => {
            Alert.alert('Success!', 'Your health data NFT has been created and listed on the marketplace.');
            setCreateModalVisible(false);
            setNftTitle('');
            setNftDescription('');
            setFloorPrice('');
          }
        }
      ]
    );
  };

  const handleBuyNFT = (nft: NFTData) => {
    Alert.alert(
      'Purchase NFT',
      `Buy "${nft.title}" for ${nft.price} ${nft.currency}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Buy Now',
          onPress: () => {
            Alert.alert('Success!', 'NFT purchased successfully! The health data is now available in your collection.');
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-purple-600 pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-semibold mb-2">Health Data NFTs</Text>
        <Text className="text-white/80">Monetize and discover valuable health insights</Text>
      </View>

      {/* Tab Navigation */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row">
          {[
            { key: 'marketplace', label: 'Marketplace', icon: 'storefront' },
            { key: 'create', label: 'Create', icon: 'add-circle' },
            { key: 'owned', label: 'My NFTs', icon: 'diamond' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex-row items-center justify-center py-2 mx-1 rounded-lg ${
                activeTab === tab.key ? 'bg-purple-100' : 'bg-transparent'
              }`}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={18} 
                color={activeTab === tab.key ? '#7C3AED' : '#6B7280'} 
              />
              <Text className={`ml-2 font-medium ${
                activeTab === tab.key ? 'text-purple-700' : 'text-gray-600'
              }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-900 font-semibold text-xl">Health Data Marketplace</Text>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-800 font-medium text-sm">{marketplaceNFTs.length} Available</Text>
              </View>
            </View>
            
            {marketplaceNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onPress={() => {}}
                onBuy={() => handleBuyNFT(nft)}
              />
            ))}
          </>
        )}

        {/* Create Tab */}
        {activeTab === 'create' && (
          <View>
            <Text className="text-gray-900 font-semibold text-xl mb-4">Create Health Data NFT</Text>
            
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
              <Text className="text-gray-900 font-semibold text-lg mb-3">Your Available Data</Text>
              
              <View className="flex-row items-center mb-3">
                <Ionicons name="medical" size={20} color="#00C851" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-medium">Genetic Profile</Text>
                  <Text className="text-gray-600 text-sm">4 gene variants analyzed</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#00C851" />
              </View>
              
              <View className="flex-row items-center mb-3">
                <Ionicons name="analytics" size={20} color="#3B82F6" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-medium">Blood Test Results</Text>
                  <Text className="text-gray-600 text-sm">12 months of data</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#00C851" />
              </View>
              
              <View className="flex-row items-center mb-3">
                <Ionicons name="restaurant" size={20} color="#FF6B35" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-medium">Nutrition Data</Text>
                  <Text className="text-gray-600 text-sm">Personalized meal responses</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#00C851" />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setCreateModalVisible(true)}
              className="bg-purple-600 rounded-xl py-4 flex-row items-center justify-center"
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Create NFT from My Data</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Owned Tab */}
        {activeTab === 'owned' && (
          <>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-900 font-semibold text-xl">My NFT Collection</Text>
              <View className="bg-purple-100 px-3 py-1 rounded-full">
                <Text className="text-purple-800 font-medium text-sm">{ownedNFTs.length} Owned</Text>
              </View>
            </View>
            
            {ownedNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onPress={() => {}}
              />
            ))}

            {/* Earnings Summary */}
            <View className="bg-white rounded-xl p-4 mt-4 shadow-sm border border-gray-100">
              <Text className="text-gray-900 font-semibold text-lg mb-3">Earnings Summary</Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-2xl font-bold text-purple-600">2.4 ETH</Text>
                  <Text className="text-gray-600 text-sm">Total Earned</Text>
                </View>
                <View>
                  <Text className="text-2xl font-bold text-green-600">$4,320</Text>
                  <Text className="text-gray-600 text-sm">USD Value</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Create NFT Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={createModalVisible}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-gray-900">Create Health Data NFT</Text>
              <TouchableOpacity 
                onPress={() => setCreateModalVisible(false)}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">NFT Title</Text>
              <TextInput
                value={nftTitle}
                onChangeText={setNftTitle}
                placeholder="e.g., My MTHFR Optimization Journey"
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Description</Text>
              <TextInput
                value={nftDescription}
                onChangeText={setNftDescription}
                placeholder="Describe your health data and insights..."
                multiline
                numberOfLines={3}
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </View>
            
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Floor Price (ETH)</Text>
              <TextInput
                value={floorPrice}
                onChangeText={setFloorPrice}
                placeholder="0.5"
                keyboardType="numeric"
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </View>
            
            <TouchableOpacity
              onPress={handleCreateNFT}
              className="bg-purple-600 rounded-lg py-3 flex-row items-center justify-center"
            >
              <Ionicons name="diamond" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Create & List NFT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}