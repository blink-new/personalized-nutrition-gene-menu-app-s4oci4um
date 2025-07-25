import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GeneVariantCard from '../../components/GeneVariantCard';

interface GeneVariant {
  gene: string;
  variant: string;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
  recommendations: string[];
}

export default function GenesScreen() {
  const [selectedVariant, setSelectedVariant] = useState<GeneVariant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const geneVariants: GeneVariant[] = [
    {
      gene: 'MTHFR',
      variant: 'C677T (heterozygous)',
      risk: 'Medium',
      description: 'Reduced folate metabolism efficiency. This variant affects how your body processes folate and B-vitamins.',
      recommendations: [
        'Increase leafy green vegetables (spinach, kale, arugula)',
        'Consider methylfolate supplements instead of folic acid',
        'Limit processed foods high in synthetic folate',
        'Include foods rich in natural folate (asparagus, broccoli)',
        'Avoid excessive alcohol consumption'
      ]
    },
    {
      gene: 'APOE',
      variant: 'ε3/ε4',
      risk: 'High',
      description: 'Increased Alzheimer\'s risk and altered fat metabolism. This variant affects brain health and cardiovascular function.',
      recommendations: [
        'Follow Mediterranean diet pattern',
        'Increase omega-3 rich foods (fatty fish, walnuts)',
        'Regular aerobic exercise',
        'Limit saturated and trans fats',
        'Include antioxidant-rich berries and vegetables',
        'Maintain healthy sleep patterns'
      ]
    },
    {
      gene: 'FTO',
      variant: 'AA genotype',
      risk: 'Medium',
      description: 'Higher obesity risk with slower satiety signals. This variant affects appetite regulation and metabolism.',
      recommendations: [
        'Practice portion control and mindful eating',
        'Include high-fiber foods to increase satiety',
        'Maintain regular meal timing',
        'Start day with protein-rich breakfast',
        'Stay well-hydrated throughout the day'
      ]
    },
    {
      gene: 'COMT',
      variant: 'Val158Met (Met/Met)',
      risk: 'Low',
      description: 'Slower dopamine breakdown with better stress resilience. This variant affects neurotransmitter metabolism.',
      recommendations: [
        'Moderate caffeine intake (you may be more sensitive)',
        'Practice stress management techniques',
        'Maintain regular sleep schedule',
        'Include magnesium-rich foods',
        'Consider meditation or mindfulness practices'
      ]
    }
  ];

  const handleVariantPress = (variant: GeneVariant) => {
    setSelectedVariant(variant);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-500 pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-semibold mb-2">Gene Profile</Text>
        <Text className="text-white/80">Your genetic variants and nutrition insights</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Overall Score */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="items-center">
            <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-4">
              <Text className="text-green-600 text-3xl font-bold">92</Text>
            </View>
            <Text className="text-gray-900 font-semibold text-xl mb-2">Genetic Compatibility Score</Text>
            <Text className="text-gray-600 text-center">Your current menu is highly optimized for your genetic profile</Text>
          </View>
        </View>

        {/* Gene Variants */}
        <Text className="text-gray-900 font-semibold text-xl mb-4">Your Genetic Variants</Text>
        
        {geneVariants.map((variant, index) => (
          <GeneVariantCard 
            key={index}
            variant={variant}
            onPress={() => handleVariantPress(variant)}
          />
        ))}

        {/* Nutrition Insights */}
        <View className="bg-white rounded-xl p-4 mb-8 shadow-sm border border-gray-100">
          <Text className="text-gray-900 font-semibold text-lg mb-3">Key Nutrition Insights</Text>
          
          <View className="flex-row items-center mb-3">
            <Ionicons name="leaf" size={20} color="#00C851" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 font-medium">Folate Metabolism</Text>
              <Text className="text-gray-600 text-sm">Requires methylated forms of B-vitamins</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="fitness" size={20} color="#FF6B35" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 font-medium">Fat Metabolism</Text>
              <Text className="text-gray-600 text-sm">Mediterranean diet pattern recommended</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="restaurant" size={20} color="#8B5CF6" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 font-medium">Satiety Response</Text>
              <Text className="text-gray-600 text-sm">Benefits from structured meal timing</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Gene Variant Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-gray-900">
                {selectedVariant?.gene}
              </Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            {selectedVariant && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-gray-500 text-lg mb-4">{selectedVariant.variant}</Text>
                <Text className="text-gray-700 mb-6">{selectedVariant.description}</Text>
                
                <Text className="text-xl font-semibold text-gray-900 mb-3">Personalized Recommendations</Text>
                {selectedVariant.recommendations.map((rec, index) => (
                  <View key={index} className="flex-row items-start mb-3">
                    <Ionicons name="checkmark-circle" size={20} color="#00C851" />
                    <Text className="text-gray-700 ml-3 flex-1">{rec}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}