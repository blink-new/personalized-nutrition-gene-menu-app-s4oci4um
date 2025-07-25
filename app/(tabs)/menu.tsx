import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

interface MealItem {
  id: string
  name: string
  description: string
  nutrients: string[]
  geneMatch: number
  ingredients: string[]
}

interface DayMenu {
  breakfast: MealItem
  lunch: MealItem
  dinner: MealItem
}

export default function MenuScreen() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [orderingMeal, setOrderingMeal] = useState<string | null>(null)

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  const weeklyMenu: DayMenu[] = [
    {
      breakfast: {
        id: 'b1',
        name: 'Antioxidant Berry Bowl',
        description: 'Blueberries, strawberries, spinach, and chia seeds',
        nutrients: ['Vitamin C', 'Anthocyanins', 'Folate'],
        geneMatch: 95,
        ingredients: ['Organic blueberries', 'Fresh strawberries', 'Baby spinach', 'Chia seeds', 'Coconut milk']
      },
      lunch: {
        id: 'l1',
        name: 'Mediterranean Kale Salad',
        description: 'Kale, avocado, cherry tomatoes, and olive oil',
        nutrients: ['Vitamin K', 'Healthy Fats', 'Lycopene'],
        geneMatch: 88,
        ingredients: ['Organic kale', 'Ripe avocado', 'Cherry tomatoes', 'Extra virgin olive oil', 'Lemon']
      },
      dinner: {
        id: 'd1',
        name: 'Roasted Rainbow Vegetables',
        description: 'Sweet potato, broccoli, bell peppers, and carrots',
        nutrients: ['Beta-carotene', 'Vitamin C', 'Fiber'],
        geneMatch: 92,
        ingredients: ['Sweet potato', 'Fresh broccoli', 'Bell peppers', 'Organic carrots', 'Herbs']
      }
    },
    // Add more days with different meals
    {
      breakfast: {
        id: 'b2',
        name: 'Green Power Smoothie',
        description: 'Spinach, banana, mango, and coconut water',
        nutrients: ['Iron', 'Potassium', 'Vitamin A'],
        geneMatch: 90,
        ingredients: ['Fresh spinach', 'Ripe banana', 'Mango chunks', 'Coconut water', 'Lime']
      },
      lunch: {
        id: 'l2',
        name: 'Colorful Quinoa Bowl',
        description: 'Quinoa, roasted vegetables, and tahini dressing',
        nutrients: ['Complete Protein', 'Magnesium', 'B-vitamins'],
        geneMatch: 85,
        ingredients: ['Organic quinoa', 'Roasted vegetables', 'Tahini', 'Cucumber', 'Red cabbage']
      },
      dinner: {
        id: 'd2',
        name: 'Cruciferous Veggie Stir-fry',
        description: 'Broccoli, cauliflower, Brussels sprouts with ginger',
        nutrients: ['Sulforaphane', 'Vitamin K', 'Folate'],
        geneMatch: 94,
        ingredients: ['Broccoli florets', 'Cauliflower', 'Brussels sprouts', 'Fresh ginger', 'Garlic']
      }
    }
  ]

  const handleOrderFromAmazon = async (meal: MealItem, mealType: string) => {
    setOrderingMeal(meal.id)
    
    // Simulate API call to Amazon Fresh
    setTimeout(() => {
      Alert.alert(
        'Order Placed!',
        `Your ${mealType} ingredients for "${meal.name}" have been ordered from Amazon Fresh. Delivery expected within 2 hours.`,
        [{ text: 'OK', onPress: () => setOrderingMeal(null) }]
      )
    }, 2000)
  }

  const currentMenu = weeklyMenu[selectedDay] || weeklyMenu[0]

  const MealCard = ({ meal, mealType, icon }: { meal: MealItem, mealType: string, icon: string }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Ionicons name={icon as any} size={24} color="#FF6B35" />
          <Text className="text-dark font-inter-medium text-lg ml-2">{mealType}</Text>
        </View>
        <View className="bg-primary/10 px-3 py-1 rounded-full">
          <Text className="text-primary font-inter-medium text-sm">{meal.geneMatch}% match</Text>
        </View>
      </View>

      <Text className="text-dark font-inter-medium text-xl mb-2">{meal.name}</Text>
      <Text className="text-gray-600 font-inter mb-3">{meal.description}</Text>

      <View className="flex-row flex-wrap mb-3">
        {meal.nutrients.map((nutrient, index) => (
          <View key={index} className="bg-primary/5 px-2 py-1 rounded-lg mr-2 mb-1">
            <Text className="text-primary font-inter text-xs">{nutrient}</Text>
          </View>
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-dark font-inter-medium text-sm mb-2">Ingredients:</Text>
        {meal.ingredients.map((ingredient, index) => (
          <Text key={index} className="text-gray-600 font-inter text-sm">• {ingredient}</Text>
        ))}
      </View>

      <TouchableOpacity
        className={`py-3 px-4 rounded-xl flex-row items-center justify-center ${
          orderingMeal === meal.id ? 'bg-gray-400' : 'bg-accent'
        }`}
        onPress={() => handleOrderFromAmazon(meal, mealType)}
        disabled={orderingMeal === meal.id}
      >
        {orderingMeal === meal.id ? (
          <>
            <Ionicons name="hourglass" size={18} color="white" />
            <Text className="text-white font-inter-medium ml-2">Ordering...</Text>
          </>
        ) : (
          <>
            <Ionicons name="bag" size={18} color="white" />
            <Text className="text-white font-inter-medium ml-2">Order from Amazon Fresh</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  )

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-inter-medium mb-2">Weekly Menu</Text>
        <Text className="text-white/80 font-inter">Personalized for your genetic profile</Text>
      </View>

      {/* Day Selector */}
      <View className="px-6 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {weekDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-2 rounded-full mr-3 ${
                  selectedDay === index ? 'bg-primary' : 'bg-white'
                }`}
                onPress={() => setSelectedDay(index)}
              >
                <Text className={`font-inter-medium ${
                  selectedDay === index ? 'text-white' : 'text-gray-600'
                }`}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Menu Content */}
      <ScrollView className="flex-1 px-6">
        <MealCard meal={currentMenu.breakfast} mealType="Breakfast" icon="sunny" />
        <MealCard meal={currentMenu.lunch} mealType="Lunch" icon="partly-sunny" />
        <MealCard meal={currentMenu.dinner} mealType="Dinner" icon="moon" />

        {/* Weekly Summary */}
        <View className="bg-white rounded-2xl p-4 mb-8">
          <Text className="text-dark font-inter-medium text-lg mb-3">This Week's Focus</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="fitness" size={16} color="#00C851" />
            <Text className="text-gray-600 font-inter ml-2">High antioxidant foods for inflammation reduction</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="leaf" size={16} color="#00C851" />
            <Text className="text-gray-600 font-inter ml-2">Cruciferous vegetables for detoxification support</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="heart" size={16} color="#00C851" />
            <Text className="text-gray-600 font-inter ml-2">Omega-3 rich foods for cardiovascular health</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}