import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Professional Icons with cleaner design
const NutritionIcon = ({ size = 24, color = "#10b981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13L13.5 7C14.1 6.2 15 5.7 16 5.7C17.9 5.7 19.4 7.2 19.4 9H21ZM9 9C9 7.2 10.6 5.7 12.5 5.7C13.5 5.7 14.4 6.2 15 7L13.5 13L7.5 7C8.1 6.2 9 5.7 10 5.7H9ZM12 8C10.3 8 9 9.8 9 12V22H15V12C15 9.8 13.7 8 12 8Z"
      fill={color}
    />
  </Svg>
);

const CalendarIcon = ({ size = 24, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 2V6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 2V6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 10H21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProgressIcon = ({ size = 24, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M12 8V12L15 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MenuIcon = ({ size = 24, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12H21M3 6H21M3 18H21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MealPlanScreen = ({ route, navigation }) => {
  const { userProfile, dailyCalories } = route.params || {};
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [nutritionProgress, setNutritionProgress] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });

  // Sample user data
  const userData = userProfile || {
    name: 'Alex Johnson',
    goal: 'Lose Weight',
    dailyCalories: dailyCalories || 1800,
    macroRatio: { protein: 30, carbs: 40, fats: 30 }
  };

  // Sample meal data
  const weeklyMeals = {
    Monday: {
      breakfast: { 
        name: 'Protein Oats with Berries', 
        calories: 420, 
        protein: 25, 
        carbs: 55, 
        fats: 10,
        image: 'https://images.unsplash.com/photo-1505253715462-077b0fdb3c0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      lunch: { 
        name: 'Grilled Chicken Salad', 
        calories: 480, 
        protein: 35, 
        carbs: 30, 
        fats: 25,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      dinner: { 
        name: 'Salmon with Quinoa', 
        calories: 520, 
        protein: 40, 
        carbs: 45, 
        fats: 20,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    },
    Tuesday: {
      breakfast: { 
        name: 'Veggie Omelette', 
        calories: 380, 
        protein: 30, 
        carbs: 15, 
        fats: 25,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      lunch: { 
        name: 'Quinoa Bowl with Avocado', 
        calories: 450, 
        protein: 20, 
        carbs: 55, 
        fats: 18,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      dinner: { 
        name: 'Lean Beef Stir Fry', 
        calories: 510, 
        protein: 35, 
        carbs: 40, 
        fats: 22,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    },
    Wednesday: {
      breakfast: { 
        name: 'Greek Yogurt Parfait', 
        calories: 350, 
        protein: 28, 
        carbs: 35, 
        fats: 8,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      lunch: { 
        name: 'Turkey Wrap', 
        calories: 420, 
        protein: 32, 
        carbs: 38, 
        fats: 15,
        image: 'https://images.unsplash.com/photo-1565299585323-38174c21c044?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      dinner: { 
        name: 'Grilled Cod with Sweet Potato', 
        calories: 480, 
        protein: 38, 
        carbs: 42, 
        fats: 12,
        image: 'https://images.unsplash.com/photo-1580476262798-bddd9638ef7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    },
  };

  const daysOfWeek = [
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
    { short: 'Sat', full: 'Saturday' },
    { short: 'Sun', full: 'Sunday' }
  ];

  // Calculate nutrition progress
  useEffect(() => {
    const meals = weeklyMeals[selectedDay];
    if (!meals) return;

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    Object.values(meals).forEach(meal => {
      totalCalories += meal.calories;
      totalProtein += meal.protein;
      totalCarbs += meal.carbs;
      totalFats += meal.fats;
    });

    setNutritionProgress({
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fats: totalFats
    });
  }, [selectedDay]);

  const ProgressBar = ({ current, max, color = "bg-emerald-500" }) => {
    const percentage = Math.min((current / max) * 100, 100);
    
    return (
      <View className="mb-3">
        <View className="w-full bg-gray-100 rounded-full h-2">
          <View 
            className={`h-2 rounded-full ${color}`} 
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>
    );
  };

  const NutritionProgress = () => {
    const proteinMax = userData.dailyCalories * (userData.macroRatio.protein / 100) / 4;
    const carbsMax = userData.dailyCalories * (userData.macroRatio.carbs / 100) / 4;
    const fatsMax = userData.dailyCalories * (userData.macroRatio.fats / 100) / 9;

    return (
      <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
        <View className="flex-row items-center mb-5">
          <View className="bg-emerald-50 p-2 rounded-xl mr-3">
            <ProgressIcon size={20} color="#10b981" />
          </View>
          <Text className="text-gray-900 text-lg font-semibold">Daily Progress</Text>
        </View>
        
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 font-medium">Calories</Text>
            <Text className="text-gray-900 font-semibold">
              {nutritionProgress.calories} / {userData.dailyCalories}
            </Text>
          </View>
          <ProgressBar 
            current={nutritionProgress.calories} 
            max={userData.dailyCalories} 
            color="bg-emerald-500" 
          />
        </View>
        
        <View className="flex-row justify-between">
          <View className="flex-1 mr-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700 font-medium text-sm">Protein</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                {nutritionProgress.protein}g
              </Text>
            </View>
            <ProgressBar 
              current={nutritionProgress.protein} 
              max={proteinMax} 
              color="bg-blue-500" 
            />
          </View>
          
          <View className="flex-1 mx-2">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700 font-medium text-sm">Carbs</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                {nutritionProgress.carbs}g
              </Text>
            </View>
            <ProgressBar 
              current={nutritionProgress.carbs} 
              max={carbsMax} 
              color="bg-amber-500" 
            />
          </View>
          
          <View className="flex-1 ml-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700 font-medium text-sm">Fats</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                {nutritionProgress.fats}g
              </Text>
            </View>
            <ProgressBar 
              current={nutritionProgress.fats} 
              max={fatsMax} 
              color="bg-rose-500" 
            />
          </View>
        </View>
      </View>
    );
  };

  const DaySelector = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-6"
    >
      {daysOfWeek.map(day => {
        const isAvailable = weeklyMeals[day.full];
        const isSelected = selectedDay === day.full;
        
        return (
          <TouchableOpacity
            key={day.short}
            onPress={() => isAvailable && setSelectedDay(day.full)}
            disabled={!isAvailable}
            className={`px-5 py-3 rounded-2xl mr-3 min-w-16 items-center ${
              isSelected 
                ? 'bg-emerald-500 shadow-sm' 
                : isAvailable
                  ? 'bg-white border border-gray-200'
                  : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <Text className={`font-medium ${
              isSelected 
                ? 'text-white' 
                : isAvailable
                  ? 'text-gray-700'
                  : 'text-gray-400'
            }`}>
              {day.short}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const MealCard = ({ meal, mealType }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-50">
      <View className="flex-row">
        <Image 
          source={{ uri: meal.image }} 
          className="w-20 h-20 rounded-xl mr-4"
        />
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <View className="bg-emerald-50 px-2 py-1 rounded-full">
              <Text className="text-emerald-600 text-xs font-medium capitalize">
                {mealType}
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-900 font-semibold text-base mb-1">
            {meal.name}
          </Text>
          
          <Text className="text-gray-600 text-sm mb-3">
            {meal.calories} calories
          </Text>
          
          <View className="flex-row">
            <View className="bg-blue-50 px-2 py-1 rounded mr-2">
              <Text className="text-blue-600 text-xs font-medium">
                P: {meal.protein}g
              </Text>
            </View>
            <View className="bg-amber-50 px-2 py-1 rounded mr-2">
              <Text className="text-amber-600 text-xs font-medium">
                C: {meal.carbs}g
              </Text>
            </View>
            <View className="bg-rose-50 px-2 py-1 rounded">
              <Text className="text-rose-600 text-xs font-medium">
                F: {meal.fats}g
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-400 text-sm mr-1">♡</Text>
          <Text className="text-gray-600 text-sm">Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-400 text-sm mr-1">🔄</Text>
          <Text className="text-gray-600 text-sm">Swap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-400 text-sm mr-1">✏️</Text>
          <Text className="text-emerald-600 text-sm font-medium">Customize</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const UserHeader = () => (
    <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-gray-900 text-xl font-bold mb-1">
            Hello, {userData.name}
          </Text>
          <Text className="text-gray-600">
            {userData.goal} Plan • {userData.dailyCalories} kcal daily
          </Text>
        </View>
        <View className="bg-emerald-50 px-4 py-2 rounded-full">
          <Text className="text-emerald-600 font-semibold text-sm">92% on track</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-gray-900 font-bold text-lg">4</Text>
          <Text className="text-gray-500 text-xs">Days Left</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-900 font-bold text-lg">12</Text>
          <Text className="text-gray-500 text-xs">Meals Saved</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-900 font-bold text-lg">1,420</Text>
          <Text className="text-gray-500 text-xs">Avg Calories</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-900 font-bold text-lg">7</Text>
          <Text className="text-gray-500 text-xs">Streak Days</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-900">Meal Planner</Text>
              <Text className="text-gray-500 text-sm">Plan your perfect nutrition</Text>
            </View>
            <TouchableOpacity className="bg-gray-50 p-3 rounded-xl">
              <MenuIcon size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-6 pt-6"
        >
          <UserHeader />
          
          <View className="flex-row items-center mb-4">
            <View className="bg-gray-50 p-2 rounded-xl mr-3">
              <CalendarIcon size={20} color="#6b7280" />
            </View>
            <Text className="text-gray-900 text-lg font-semibold">Select Day</Text>
          </View>
          
          <DaySelector />
          
          <NutritionProgress />
          
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="bg-gray-50 p-2 rounded-xl mr-3">
                <NutritionIcon size={20} color="#10b981" />
              </View>
              <Text className="text-gray-900 text-lg font-semibold">
                {selectedDay}'s Meals
              </Text>
            </View>
            <Text className="text-emerald-600 text-sm font-medium">
              {nutritionProgress.calories} kcal total
            </Text>
          </View>
          
          {weeklyMeals[selectedDay] ? (
            Object.entries(weeklyMeals[selectedDay]).map(([mealType, meal]) => (
              <MealCard 
                key={mealType} 
                meal={meal} 
                mealType={mealType} 
              />
            ))
          ) : (
            <View className="bg-white rounded-2xl p-8 items-center border border-gray-100">
              <Text className="text-gray-400 text-base mb-2">No meals planned</Text>
              <Text className="text-gray-500 text-sm text-center">
                Meals for this day are not available yet
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            className="bg-emerald-500 rounded-2xl p-5 items-center mb-8 mt-4 shadow-sm"
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">Subscribe to This Plan</Text>
            <Text className="text-emerald-100 text-sm mt-1">
              Get personalized meals delivered daily
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MealPlanScreen;