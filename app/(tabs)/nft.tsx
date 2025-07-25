import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function NFTScreen() {
  const [floorPrice, setFloorPrice] = useState('0.5')
  const [selectedData, setSelectedData] = useState({
    geneData: true,
    bloodTests: true,
    nutritionHistory: false,
    fitnessData: false
  })

  const myNFTs = [
    {
      id: 'NFT001',
      title: 'Genetic Nutrition Profile #1',
      price: '0.8 ETH',
      status: 'listed',
      views: 24,
      offers: 3
    },
    {
      id: 'NFT002',
      title: 'Blood Test Results Q1 2024',
      price: '0.3 ETH',
      status: 'sold',
      views: 45,
      offers: 0
    }
  ]

  const marketplaceNFTs = [
    {
      id: 'MKT001',
      title: 'Mediterranean Diet Success Story',
      price: '1.2 ETH',
      seller: 'HealthUser123',
      dataType: 'Nutrition + Fitness'
    },
    {
      id: 'MKT002',
      title: 'APOE4 Optimization Journey',
      price: '2.1 ETH',
      seller: 'GeneticGuru',
      dataType: 'Genetic + Blood Tests'
    }
  ]

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-purple-500 pt-12 pb-6 px-6 rounded-b-3xl">
        <Text className="text-white text-2xl font-inter-medium mb-2">NFT Marketplace</Text>
        <Text className="text-white/80 font-inter">Monetize your health data securely</Text>
      </View>

      {/* Earnings Overview */}
      <View className="px-6 mt-6">
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Text className="text-dark font-inter-medium text-lg mb-4">Your Earnings</Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="text-2xl font-inter-medium text-primary">2.4 ETH</Text>
              <Text className="text-gray-600 font-inter text-sm">Total Earned</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-inter-medium text-accent">3</Text>
              <Text className="text-gray-600 font-inter text-sm">NFTs Sold</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-inter-medium text-purple-500">1</Text>
              <Text className="text-gray-600 font-inter text-sm">Active Listings</Text>
            </View>
          </View>
          
          <TouchableOpacity className="bg-primary py-3 px-4 rounded-xl">
            <Text className="text-white font-inter-medium text-center">Withdraw Earnings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Create New NFT */}
      <View className="px-6">
        <Text className="text-dark text-xl font-inter-medium mb-4">Create New NFT</Text>
        
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Text className="text-dark font-inter-medium mb-3">Select Data to Include</Text>
          
          {Object.entries(selectedData).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedData(prev => ({ ...prev, [key]: !value }))}
              className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <Text className="text-gray-700 font-inter capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
              <View className={`w-6 h-6 rounded-full border-2 ${
                value ? 'bg-primary border-primary' : 'border-gray-300'
              } items-center justify-center`}>
                {value && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
            </TouchableOpacity>
          ))}
          
          <View className="mt-4">
            <Text className="text-dark font-inter-medium mb-2">Set Floor Price (ETH)</Text>
            <TextInput
              value={floorPrice}
              onChangeText={setFloorPrice}
              placeholder="0.5"
              keyboardType="decimal-pad"
              className="border border-gray-300 rounded-xl px-4 py-3 font-inter"
            />
          </View>
          
          <TouchableOpacity className="bg-purple-500 py-3 px-4 rounded-xl mt-4">
            <Text className="text-white font-inter-medium text-center">Create & List NFT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My NFTs */}
      <View className="px-6">
        <Text className="text-dark text-xl font-inter-medium mb-4">My NFTs</Text>
        
        {myNFTs.map((nft, index) => (
          <View key={index} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-dark font-inter-medium">{nft.title}</Text>
                <Text className="text-gray-600 font-inter text-sm">ID: {nft.id}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${
                nft.status === 'listed' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Text className={`font-inter text-xs capitalize ${
                  nft.status === 'listed' ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {nft.status}
                </Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-inter-medium text-primary">{nft.price}</Text>
              <View className="flex-row items-center">
                <Ionicons name="eye" size={16} color="#6B7280" />
                <Text className="text-gray-600 font-inter text-sm ml-1">{nft.views}</Text>
                <Ionicons name="pricetag" size={16} color="#6B7280" className="ml-3" />
                <Text className="text-gray-600 font-inter text-sm ml-1">{nft.offers}</Text>
              </View>
            </View>
            
            {nft.status === 'listed' && (
              <View className="flex-row space-x-2">
                <TouchableOpacity className="flex-1 bg-gray-100 py-2 px-4 rounded-xl">
                  <Text className="text-gray-700 font-inter-medium text-center text-sm">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-red-100 py-2 px-4 rounded-xl">
                  <Text className="text-red-700 font-inter-medium text-center text-sm">Unlist</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Marketplace */}
      <View className="px-6 mt-6 mb-8">
        <Text className="text-dark text-xl font-inter-medium mb-4">Marketplace</Text>
        
        {marketplaceNFTs.map((nft, index) => (
          <View key={index} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-dark font-inter-medium">{nft.title}</Text>
                <Text className="text-gray-600 font-inter text-sm">by {nft.seller}</Text>
              </View>
              <Text className="text-lg font-inter-medium text-purple-500">{nft.price}</Text>
            </View>
            
            <View className="bg-purple-50 px-3 py-1 rounded-full self-start mb-3">
              <Text className="text-purple-700 font-inter text-sm">{nft.dataType}</Text>
            </View>
            
            <TouchableOpacity className="bg-purple-500 py-2 px-4 rounded-xl">
              <Text className="text-white font-inter-medium text-center text-sm">View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity className="bg-gray-100 py-3 px-4 rounded-xl">
          <Text className="text-gray-700 font-inter-medium text-center">Browse All NFTs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}