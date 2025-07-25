import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function GenesScreen() {
  const geneData = [
    {
      gene: 'MTHFR',
      variant: 'C677T',
      impact: 'Reduced folate metabolism',
      recommendation: 'Increase leafy greens, avoid folic acid supplements',
      status: 'high'
    },
    {
      gene: 'APOE',
      variant: 'ε3/ε4',
      impact: 'Increased cardiovascular risk',
      recommendation: 'Omega-3 rich foods, limit saturated fats',
      status: 'medium'
    },
    {
      gene: 'FTO',
      variant: 'AA',
      impact: 'Higher obesity risk',
      recommendation: 'Portion control, high fiber foods',
      status: 'medium'
    },
    {
      gene: 'COMT',
      variant: 'Val/Met',
      impact: 'Moderate caffeine sensitivity',
      recommendation: 'Limit coffee to 1-2 cups daily',
      status: 'low'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case 'high': return '#FEF2F2'
      case 'medium': return '#FFFBEB'
      case 'low': return '#F0FDF4'
      default: return '#F9FAFB'
    }
  }

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary pt-12 pb-6 px-6 rounded-b-3xl">
        <Text className="text-white text-2xl font-inter-medium mb-2">Gene Profile</Text>
        <Text className="text-white/80 font-inter">Your genetic nutrition insights</Text>
      </View>

      {/* Gene Analysis Summary */}
      <View className="px-6 mt-6">
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Text className="text-dark font-inter-medium text-lg mb-3">Analysis Summary</Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="text-2xl font-inter-medium text-red-500">2</Text>
              <Text className="text-gray-600 font-inter text-sm">High Priority</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-inter-medium text-yellow-500">2</Text>
              <Text className="text-gray-600 font-inter text-sm">Medium</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-inter-medium text-green-500">1</Text>
              <Text className="text-gray-600 font-inter text-sm">Low Risk</Text>
            </View>
          </View>
          
          <TouchableOpacity className="bg-primary/10 py-2 px-4 rounded-xl">
            <Text className="text-primary font-inter-medium text-center">Upload New Gene Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gene Variants */}
      <View className="px-6">
        <Text className="text-dark text-xl font-inter-medium mb-4">Gene Variants</Text>
        
        {geneData.map((gene, index) => (
          <View key={index} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-dark font-inter-medium text-lg">{gene.gene}</Text>
                <Text className="text-gray-600 font-inter text-sm">{gene.variant}</Text>
              </View>
              <View 
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: getStatusBg(gene.status) }}
              >
                <Text 
                  className="font-inter text-xs capitalize"
                  style={{ color: getStatusColor(gene.status) }}
                >
                  {gene.status} priority
                </Text>
              </View>
            </View>
            
            <View className="mb-3">
              <Text className="text-gray-700 font-inter text-sm mb-1">Impact:</Text>
              <Text className="text-dark font-inter">{gene.impact}</Text>
            </View>
            
            <View className="bg-primary/5 p-3 rounded-xl">
              <Text className="text-gray-700 font-inter text-sm mb-1">Recommendation:</Text>
              <Text className="text-primary font-inter">{gene.recommendation}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Nutrition Compatibility */}
      <View className="px-6 mt-6 mb-8">
        <Text className="text-dark text-xl font-inter-medium mb-4">Nutrition Compatibility</Text>
        
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <Ionicons name="leaf" size={24} color="#00C851" />
            <Text className="text-dark font-inter-medium text-lg ml-3">Best Foods for You</Text>
          </View>
          
          <View className="flex-row flex-wrap">
            {['Spinach', 'Blueberries', 'Salmon', 'Avocado', 'Broccoli', 'Sweet Potato'].map((food, index) => (
              <View key={index} className="bg-primary/10 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-primary font-inter text-sm">{food}</Text>
              </View>
            ))}
          </View>
          
          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row items-center mb-2">
              <Ionicons name="warning" size={20} color="#F59E0B" />
              <Text className="text-gray-700 font-inter-medium ml-2">Foods to Limit</Text>
            </View>
            
            <View className="flex-row flex-wrap">
              {['Processed meats', 'Refined sugar', 'Trans fats'].map((food, index) => (
                <View key={index} className="bg-red-50 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-red-600 font-inter text-sm">{food}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}