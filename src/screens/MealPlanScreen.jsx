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
  Platform,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Enhanced Icons
const NutritionIcon = ({ size = 24, color = "#ff6b35" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13L13.5 7C14.1 6.2 15 5.7 16 5.7C17.9 5.7 19.4 7.2 19.4 9H21ZM9 9C9 7.2 10.6 5.7 12.5 5.7C13.5 5.7 14.4 6.2 15 7L13.5 13L7.5 7C8.1 6.2 9 5.7 10 5.7H9ZM12 8C10.3 8 9 9.8 9 12V22H15V12C15 9.8 13.7 8 12 8Z"
      fill={color}
    />
  </Svg>
);

const CalendarIcon = ({ size = 24, color = "#ff6b35" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const FireIcon = ({ size = 24, color = "#ff6b35" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"
      fill={color}
    />
  </Svg>
);

const LightningIcon = ({ size = 24, color = "#ffd93d" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill={color} />
  </Svg>
);

const MenuIcon = ({ size = 24, color = "#ffffff" }) => (
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

const FilterIcon = ({ size = 24, color = "#ff6b35" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CloseIcon = ({ size = 24, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6L18 18"
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
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    dietType: 'all',
    mealType: 'all',
    calorieRange: 'all',
    cuisine: 'all',
  });
  const [nutritionProgress, setNutritionProgress] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });

  // Sample user data
  const userData = userProfile || {
    name: 'Alex',
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
    { short: 'MON', full: 'Monday' },
    { short: 'TUE', full: 'Tuesday' },
    { short: 'WED', full: 'Wednesday' },
    { short: 'THU', full: 'Thursday' },
    { short: 'FRI', full: 'Friday' },
    { short: 'SAT', full: 'Saturday' },
    { short: 'SUN', full: 'Sunday' }
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

  const ProgressBar = ({ current, max, colors = ['#ff6b35', '#f7931e'] }) => {
    const percentage = Math.min((current / max) * 100, 100);
    
    return (
      <View className="mb-3">
        <View className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${percentage}%`, height: '100%', borderRadius: 100 }}
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
      <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
        <View className="flex-row items-center mb-5">
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: 40, height: 40, borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}
          >
            <FireIcon size={20} color="#ffffff" />
          </LinearGradient>
          <Text className="text-white text-lg font-black tracking-wide">DAILY PROGRESS</Text>
        </View>
        
        <View className="mb-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-300 font-bold text-xs tracking-wide">CALORIES</Text>
            <Text className="text-white font-black text-base">
              {nutritionProgress.calories} / {userData.dailyCalories}
            </Text>
          </View>
          <ProgressBar 
            current={nutritionProgress.calories} 
            max={userData.dailyCalories} 
            colors={['#ff6b35', '#f7931e']}
          />
        </View>
        
        <View className="flex-row justify-between">
          <View className="flex-1 mr-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-300 font-bold text-xs">PROTEIN</Text>
              <Text className="text-white font-bold text-sm">
                {nutritionProgress.protein}g
              </Text>
            </View>
            <ProgressBar 
              current={nutritionProgress.protein} 
              max={proteinMax} 
              colors={['#3b82f6', '#60a5fa']}
            />
          </View>
          
          <View className="flex-1 mx-1">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-300 font-bold text-xs">CARBS</Text>
              <Text className="text-white font-bold text-sm">
                {nutritionProgress.carbs}g
              </Text>
            </View>
            <ProgressBar 
              current={nutritionProgress.carbs} 
              max={carbsMax} 
              colors={['#fbbf24', '#fcd34d']}
            />
          </View>
          
          <View className="flex-1 ml-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-300 font-bold text-xs">FATS</Text>
              <Text className="text-white font-bold text-sm">
                {nutritionProgress.fats}g
              </Text>
            </View>
            <ProgressBar 
              current={nutritionProgress.fats} 
              max={fatsMax} 
              colors={['#ec4899', '#f472b6']}
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
      className="mb-5"
    >
      {daysOfWeek.map(day => {
        const isAvailable = weeklyMeals[day.full];
        const isSelected = selectedDay === day.full;
        
        return (
          <TouchableOpacity
            key={day.short}
            onPress={() => isAvailable && setSelectedDay(day.full)}
            disabled={!isAvailable}
            className="mr-3"
            activeOpacity={0.7}
          >
            {isSelected ? (
              <LinearGradient
                colors={['#ff6b35', '#f7931e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  minWidth: 64,
                  alignItems: 'center',
                  shadowColor: '#ff6b35',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Text className="font-black text-white text-sm tracking-wide">
                  {day.short}
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  minWidth: 64,
                  alignItems: 'center',
                  backgroundColor: isAvailable ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  borderWidth: 2,
                  borderColor: isAvailable ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Text style={{
                  fontWeight: '700',
                  color: isAvailable ? '#ffffff' : '#6b7280',
                  fontSize: 12,
                  letterSpacing: 0.5,
                }}>
                  {day.short}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const MealCard = ({ meal, mealType }) => (
    <View className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-4 border border-white/20">
      <View className="flex-row">
        <Image 
          source={{ uri: meal.image }} 
          className="w-24 h-24 rounded-xl mr-4"
          style={{ backgroundColor: '#1a1f3a' }}
        />
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <LinearGradient
              colors={['#ff6b35', '#f7931e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 12,
              }}
            >
              <Text className="text-white text-xs font-black uppercase tracking-wide">
                {mealType}
              </Text>
            </LinearGradient>
          </View>
          
          <Text className="text-white font-bold text-base mb-1">
            {meal.name}
          </Text>
          
          <View className="flex-row items-center mb-3">
            <FireIcon size={14} color="#ff6b35" />
            <Text className="text-gray-300 text-sm ml-1 font-semibold">
              {meal.calories} kcal
            </Text>
          </View>
          
          <View className="flex-row flex-wrap">
            <View className="bg-blue-500/20 border border-blue-500/40 px-2 py-1 rounded-lg mr-2 mb-1">
              <Text className="text-blue-300 text-xs font-bold">
                P: {meal.protein}g
              </Text>
            </View>
            <View className="bg-yellow-500/20 border border-yellow-500/40 px-2 py-1 rounded-lg mr-2 mb-1">
              <Text className="text-yellow-300 text-xs font-bold">
                C: {meal.carbs}g
              </Text>
            </View>
            <View className="bg-pink-500/20 border border-pink-500/40 px-2 py-1 rounded-lg mb-1">
              <Text className="text-pink-300 text-xs font-bold">
                F: {meal.fats}g
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-between mt-4 pt-4 border-t border-white/10">
        <TouchableOpacity className="flex-row items-center" activeOpacity={0.7}>
          <Text className="text-gray-400 text-base mr-1">♡</Text>
          <Text className="text-gray-300 text-sm font-semibold">Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center" activeOpacity={0.7}>
          <Text className="text-gray-400 text-base mr-1">🔄</Text>
          <Text className="text-gray-300 text-sm font-semibold">Swap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center" activeOpacity={0.7}>
          <Text className="text-gray-400 text-base mr-1">✏️</Text>
          <Text className="text-orange-400 text-sm font-bold">Customize</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const UserHeader = () => (
    <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-white text-2xl font-black mb-1 tracking-tight">
            HEY, {userData.name.toUpperCase()}! 👋
          </Text>
          <Text className="text-gray-300 font-semibold">
            {userData.goal} • {userData.dailyCalories} kcal/day
          </Text>
        </View>
        <LinearGradient
          colors={['#10b981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
        >
          <Text className="text-white font-black text-xs tracking-wide">92% ON TRACK</Text>
        </LinearGradient>
      </View>
      
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-white font-black text-xl">4</Text>
          <Text className="text-gray-400 text-xs font-semibold">Days Left</Text>
        </View>
        <View className="items-center">
          <Text className="text-white font-black text-xl">12</Text>
          <Text className="text-gray-400 text-xs font-semibold">Saved</Text>
        </View>
        <View className="items-center">
          <Text className="text-white font-black text-xl">1,420</Text>
          <Text className="text-gray-400 text-xs font-semibold">Avg Cal</Text>
        </View>
        <View className="items-center">
          <View className="flex-row items-center">
            <FireIcon size={16} color="#ff6b35" />
            <Text className="text-white font-black text-xl ml-1">7</Text>
          </View>
          <Text className="text-gray-400 text-xs font-semibold">Streak</Text>
        </View>
      </View>
    </View>
  );

  // Filter Menu Component
  const FilterMenu = () => {
    const dietTypes = ['All', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Balanced'];
    const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    const calorieRanges = ['All', 'Under 300', '300-500', '500-700', 'Over 700'];
    const cuisines = ['All', 'Indian', 'Mediterranean', 'Asian', 'American', 'Mexican'];

    const FilterChip = ({ label, isSelected, onPress }) => (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="mr-3 mb-3"
      >
        {isSelected ? (
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 12,
            }}
          >
            <Text className="text-white font-black text-sm">{label}</Text>
          </LinearGradient>
        ) : (
          <View className="bg-white/10 border-2 border-white/20 px-4 py-2.5 rounded-xl">
            <Text className="text-white font-semibold text-sm">{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );

    const applyFilters = () => {
      setShowFilterMenu(false);
      // Apply filter logic here
    };

    const resetFilters = () => {
      setFilters({
        dietType: 'all',
        mealType: 'all',
        calorieRange: 'all',
        cuisine: 'all',
      });
    };

    return (
      <Modal
        visible={showFilterMenu}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterMenu(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl" style={{ maxHeight: height * 0.85 }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <View className="flex-row items-center">
                <LinearGradient
                  colors={['#ff6b35', '#f7931e']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ width: 40, height: 40, borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}
                >
                  <FilterIcon size={20} color="#ffffff" />
                </LinearGradient>
                <Text className="text-white text-2xl font-black tracking-tight">FILTERS</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFilterMenu(false)}
                className="bg-white/10 border border-white/20 p-2 rounded-xl"
                activeOpacity={0.7}
              >
                <CloseIcon size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <ScrollView className="px-6 pt-4" showsVerticalScrollIndicator={false}>
              {/* Diet Type */}
              <View className="mb-6">
                <Text className="text-white font-black text-base mb-3 tracking-wide">DIET TYPE</Text>
                <View className="flex-row flex-wrap">
                  {dietTypes.map((type) => (
                    <FilterChip
                      key={type}
                      label={type}
                      isSelected={filters.dietType === type.toLowerCase()}
                      onPress={() => setFilters({ ...filters, dietType: type.toLowerCase() })}
                    />
                  ))}
                </View>
              </View>

              {/* Meal Type */}
              <View className="mb-6">
                <Text className="text-white font-black text-base mb-3 tracking-wide">MEAL TYPE</Text>
                <View className="flex-row flex-wrap">
                  {mealTypes.map((type) => (
                    <FilterChip
                      key={type}
                      label={type}
                      isSelected={filters.mealType === type.toLowerCase()}
                      onPress={() => setFilters({ ...filters, mealType: type.toLowerCase() })}
                    />
                  ))}
                </View>
              </View>

              {/* Calorie Range */}
              <View className="mb-6">
                <Text className="text-white font-black text-base mb-3 tracking-wide">CALORIE RANGE</Text>
                <View className="flex-row flex-wrap">
                  {calorieRanges.map((range) => (
                    <FilterChip
                      key={range}
                      label={range}
                      isSelected={filters.calorieRange === range.toLowerCase()}
                      onPress={() => setFilters({ ...filters, calorieRange: range.toLowerCase() })}
                    />
                  ))}
                </View>
              </View>

              {/* Cuisine */}
              <View className="mb-6">
                <Text className="text-white font-black text-base mb-3 tracking-wide">CUISINE</Text>
                <View className="flex-row flex-wrap">
                  {cuisines.map((cuisine) => (
                    <FilterChip
                      key={cuisine}
                      label={cuisine}
                      isSelected={filters.cuisine === cuisine.toLowerCase()}
                      onPress={() => setFilters({ ...filters, cuisine: cuisine.toLowerCase() })}
                    />
                  ))}
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row mb-8 mt-4">
                <TouchableOpacity
                  onPress={resetFilters}
                  className="flex-1 bg-white/10 border-2 border-white/20 rounded-2xl py-4 mr-2"
                  activeOpacity={0.7}
                >
                  <Text className="text-white font-black text-center tracking-wide">RESET</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={applyFilters}
                  activeOpacity={0.8}
                  className="flex-1 ml-2 overflow-hidden rounded-2xl"
                >
                  <LinearGradient
                    colors={['#ff6b35', '#f7931e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ paddingVertical: 16 }}
                  >
                    <Text className="text-white font-black text-center tracking-wide">APPLY FILTERS</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <LinearGradient
      colors={['#0a0e27', '#1a1f3a', '#2d1b4e']}
      locations={[0, 0.5, 1]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
        
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-3xl font-black text-white tracking-tight">MEAL PLAN</Text>
              <View className="flex-row items-center mt-1">
                <View className="w-8 h-1 bg-orange-500 rounded-full mr-1" />
                <LightningIcon size={12} color="#ffd93d" />
                <View className="w-8 h-1 bg-orange-500 rounded-full ml-1" />
              </View>
            </View>
            <TouchableOpacity 
              className="bg-white/10 border border-white/20 p-3 rounded-xl"
              activeOpacity={0.7}
              onPress={() => setShowFilterMenu(true)}
            >
              <MenuIcon size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 80 }}
        >
          <UserHeader />
          
          <View className="flex-row items-center mb-4">
            <LinearGradient
              colors={['#ff6b35', '#f7931e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: 40, height: 40, borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}
            >
              <CalendarIcon size={20} color="#ffffff" />
            </LinearGradient>
            <Text className="text-white text-lg font-black tracking-wide">SELECT DAY</Text>
          </View>
          
          <DaySelector />
          
          <NutritionProgress />
          
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 40, height: 40, borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}
              >
                <NutritionIcon size={20} color="#ffffff" />
              </LinearGradient>
              <Text className="text-white text-lg font-black tracking-wide">
                {selectedDay.toUpperCase()}&apos;S MEALS
              </Text>
            </View>
            <View className="flex-row items-center">
              <FireIcon size={16} color="#ff6b35" />
              <Text className="text-orange-400 text-sm font-bold ml-1">
                {nutritionProgress.calories} KCAL
              </Text>
            </View>
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
            <View className="bg-white/5 border border-white/10 rounded-2xl p-8 items-center">
              <Text className="text-gray-400 text-base mb-2 font-bold">NO MEALS PLANNED</Text>
              <Text className="text-gray-500 text-sm text-center">
                Meals for this day are not available yet
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.8}
            className="mb-8 mt-4 overflow-hidden rounded-2xl"
          >
            <LinearGradient
              colors={['#ff6b35', '#f7931e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                padding: 20,
                alignItems: 'center',
                shadowColor: '#ff6b35',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text className="text-white font-black text-lg tracking-wide">
                SUBSCRIBE TO THIS PLAN →
              </Text>
              <Text className="text-white/80 text-sm mt-1 font-semibold">
                Get personalized meals delivered daily
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* Filter Menu */}
      <FilterMenu />
    </LinearGradient>
  );
};

export default MealPlanScreen;