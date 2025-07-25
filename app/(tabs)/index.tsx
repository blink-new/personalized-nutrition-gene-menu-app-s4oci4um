import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@blinkdotnew/sdk';

const blink = createClient({
  projectId: 'personalized-nutrition-gene-menu-app-s4oci4um',
  authRequired: true
});

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);
      
      if (state.user) {
        loadUserProfile(state.user.id);
      }
    });
    return unsubscribe;
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      // Try to get existing profile
      const profiles = await blink.db.userProfiles.list({
        where: { userId: userId },
        limit: 1
      });

      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
      } else {
        // Create new profile
        const newProfile = await blink.db.userProfiles.create({
          id: `profile_${Date.now()}`,
          userId: userId,
          name: user?.displayName || 'User',
          email: user?.email || '',
          geneticScore: 92,
          totalOrders: 3,
          nftEarnings: 2.4
        });
        setUserProfile(newProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const todayMenu = {
    breakfast: 'Antioxidant Berry Bowl',
    lunch: 'Mediterranean Quinoa Salad', 
    dinner: 'Roasted Rainbow Vegetables'
  };

  const upcomingTests = [
    { name: 'Homocysteine Level', date: 'Jan 28', importance: 'High' },
    { name: 'Lipid Panel Extended', date: 'Feb 5', importance: 'Medium' }
  ];

  const handleQuickOrder = () => {
    Alert.alert(
      "Quick Order",
      "Order today's complete menu from Amazon Fresh?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Order All", 
          onPress: async () => {
            try {
              // Record the order
              await blink.db.mealOrders.create({
                id: `order_${Date.now()}`,
                userId: user.id,
                mealName: "Today's Complete Menu",
                mealType: "full_day",
                status: "pending",
                totalCalories: 1045,
                ingredients: JSON.stringify(["Blueberries", "Strawberries", "Quinoa", "Bell peppers", "Broccoli"])
              });
              
              Alert.alert("Success!", "Your complete daily menu has been ordered from Amazon Fresh!");
            } catch (error) {
              Alert.alert("Error", "Failed to place order. Please try again.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Ionicons name="leaf" size={64} color="#00C851" />
        <Text className="text-2xl font-bold text-gray-900 mt-4 mb-2">Welcome to NutriGene</Text>
        <Text className="text-gray-600 text-center mb-6">
          Please sign in to access your personalized nutrition and genetic insights
        </Text>
        <TouchableOpacity 
          onPress={() => blink.auth.login()}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-500 pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-semibold mb-2">
          Welcome back, {userProfile?.name || user.displayName || 'User'}!
        </Text>
        <Text className="text-white/80">Your personalized nutrition journey</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Health Stats */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="text-gray-900 font-semibold text-lg mb-3">Health Overview</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-green-500 text-2xl font-bold">
                {userProfile?.geneticScore || 92}
              </Text>
              <Text className="text-gray-600 text-sm">Gene Score</Text>
            </View>
            <View className="items-center">
              <Text className="text-orange-500 text-2xl font-bold">
                {userProfile?.totalOrders || 3}
              </Text>
              <Text className="text-gray-600 text-sm">Orders</Text>
            </View>
            <View className="items-center">
              <Text className="text-purple-600 text-2xl font-bold">
                {userProfile?.nftEarnings || 2.4}
              </Text>
              <Text className="text-gray-600 text-sm">ETH Earned</Text>
            </View>
          </View>
        </View>

        {/* Today's Menu Preview */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 font-semibold text-lg">Today's Menu</Text>
            <TouchableOpacity>
              <Text className="text-green-500 font-medium text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          {Object.entries(todayMenu).map(([meal, dish]) => (
            <View key={meal} className="flex-row items-center mb-2">
              <Ionicons 
                name={meal === 'breakfast' ? 'sunny' : meal === 'lunch' ? 'partly-sunny' : 'moon'} 
                size={16} 
                color="#FF6B35" 
              />
              <Text className="text-gray-700 ml-2 capitalize">{meal}:</Text>
              <Text className="text-gray-900 font-medium ml-1">{dish}</Text>
            </View>
          ))}
          
          <TouchableOpacity 
            onPress={handleQuickOrder}
            className="bg-orange-500 rounded-lg py-2 mt-3 flex-row items-center justify-center"
          >
            <Ionicons name="bag-add" size={16} color="white" />
            <Text className="text-white font-medium ml-2">Order Complete Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Blood Tests */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 font-semibold text-lg">Upcoming Tests</Text>
            <TouchableOpacity>
              <Text className="text-green-500 font-medium text-sm">Schedule</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingTests.map((test, index) => (
            <View key={index} className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center flex-1">
                <Ionicons name="medical" size={16} color="#00C851" />
                <View className="ml-2 flex-1">
                  <Text className="text-gray-900 font-medium text-sm">{test.name}</Text>
                  <Text className="text-gray-600 text-xs">{test.date}</Text>
                </View>
              </View>
              <View className={`px-2 py-1 rounded ${test.importance === 'High' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                <Text className={`text-xs font-medium ${test.importance === 'High' ? 'text-red-800' : 'text-yellow-800'}`}>
                  {test.importance}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-xl p-4 mb-8 shadow-sm border border-gray-100">
          <Text className="text-gray-900 font-semibold text-lg mb-3">Quick Actions</Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity 
              onPress={handleQuickOrder}
              className="bg-green-50 rounded-xl p-3 flex-1 mr-2 items-center"
            >
              <Ionicons name="bag" size={24} color="#00C851" />
              <Text className="text-green-600 font-medium text-sm mt-1">Order Menu</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-orange-50 rounded-xl p-3 flex-1 mx-1 items-center">
              <Ionicons name="calendar" size={24} color="#FF6B35" />
              <Text className="text-orange-600 font-medium text-sm mt-1">Book Test</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-purple-50 rounded-xl p-3 flex-1 ml-2 items-center">
              <Ionicons name="diamond" size={24} color="#8B5CF6" />
              <Text className="text-purple-600 font-medium text-sm mt-1">Create NFT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}