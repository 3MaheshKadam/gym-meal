import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const ProfileScreen = ({ navigation }) => {
  // User profile state
  const [userProfile, setUserProfile] = useState({
    personalInfo: {
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1995-03-15',
      gender: 'Male',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    physicalStats: {
      height: 175, // cm
      weight: 75, // kg
      targetWeight: 70, // kg
      bodyFat: 15, // percentage
      activityLevel: 'Moderately Active'
    },
    fitnessGoals: {
      primary: 'Weight Loss',
      secondary: 'Muscle Gain',
      timeline: '6 months',
      workoutFrequency: '4-5 times/week'
    },
    dietaryPreferences: {
      dietType: 'Balanced',
      allergies: ['Nuts', 'Dairy'],
      dislikes: ['Mushrooms'],
      cuisinePreferences: ['Indian', 'Mediterranean'],
      mealPreferences: {
        breakfast: true,
        lunch: true,
        dinner: true,
        snacks: true
      }
    },
    nutritionTargets: {
      dailyCalories: 1800,
      protein: 135, // grams
      carbs: 180, // grams
      fats: 60, // grams
      water: 3.5 // liters
    },
    appSettings: {
      notifications: true,
      darkMode: false,
      units: 'metric', // metric or imperial
      privacy: 'private'
    }
  });

  const [editingSection, setEditingSection] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Professional Icons
  const UserIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const StatsIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M16 4V10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12H22V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M16 4L22 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const TargetIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2"/>
      <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const HeartIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.5487 7.04096 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const NutritionIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={color}/>
    </Svg>
  );

  const SettingsIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
      <Path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const EditIcon = ({ size = 20, color = "#10b981" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const CameraIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const ArrowRightIcon = ({ size = 20, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const LogoutIcon = ({ size = 20, color = "#ef4444" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M16 17L21 12L16 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M21 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  // Calculate BMI
  const calculateBMI = () => {
    const heightInM = userProfile.physicalStats.height / 100;
    const bmi = userProfile.physicalStats.weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  // Get BMI status
  const getBMIStatus = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { status: 'Normal', color: 'text-emerald-600' };
    if (bmi < 30) return { status: 'Overweight', color: 'text-amber-600' };
    return { status: 'Obese', color: 'text-red-600' };
  };

  // Activity levels
  const activityLevels = [
    'Sedentary (little/no exercise)',
    'Lightly Active (light exercise 1-3 days/week)',
    'Moderately Active (moderate exercise 3-5 days/week)',
    'Very Active (hard exercise 6-7 days/week)',
    'Extremely Active (very hard exercise, physical job)'
  ];

  // Fitness goals
  const fitnessGoals = [
    'Weight Loss', 'Weight Gain', 'Muscle Gain', 'Muscle Definition',
    'Endurance', 'General Fitness', 'Athletic Performance'
  ];

  // Diet types
  const dietTypes = [
    'Balanced', 'Vegetarian', 'Vegan', 'Keto', 'Paleo',
    'Mediterranean', 'Low Carb', 'High Protein'
  ];

  // Profile sections data
  const profileSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <UserIcon size={20} color="#10b981" />,
      data: [
        { label: 'Full Name', value: userProfile.personalInfo.name },
        { label: 'Email', value: userProfile.personalInfo.email },
        { label: 'Phone', value: userProfile.personalInfo.phone },
        { label: 'Date of Birth', value: new Date(userProfile.personalInfo.dateOfBirth).toLocaleDateString() },
        { label: 'Gender', value: userProfile.personalInfo.gender }
      ]
    },
    {
      id: 'physical',
      title: 'Physical Stats',
      icon: <StatsIcon size={20} color="#10b981" />,
      data: [
        { label: 'Height', value: `${userProfile.physicalStats.height} cm` },
        { label: 'Current Weight', value: `${userProfile.physicalStats.weight} kg` },
        { label: 'Target Weight', value: `${userProfile.physicalStats.targetWeight} kg` },
        { label: 'Body Fat', value: `${userProfile.physicalStats.bodyFat}%` },
        { label: 'BMI', value: `${calculateBMI()} (${getBMIStatus().status})` },
        { label: 'Activity Level', value: userProfile.physicalStats.activityLevel }
      ]
    },
    {
      id: 'goals',
      title: 'Fitness Goals',
      icon: <TargetIcon size={20} color="#10b981" />,
      data: [
        { label: 'Primary Goal', value: userProfile.fitnessGoals.primary },
        { label: 'Secondary Goal', value: userProfile.fitnessGoals.secondary },
        { label: 'Timeline', value: userProfile.fitnessGoals.timeline },
        { label: 'Workout Frequency', value: userProfile.fitnessGoals.workoutFrequency }
      ]
    },
    {
      id: 'dietary',
      title: 'Dietary Preferences',
      icon: <HeartIcon size={20} color="#10b981" />,
      data: [
        { label: 'Diet Type', value: userProfile.dietaryPreferences.dietType },
        { label: 'Allergies', value: userProfile.dietaryPreferences.allergies.join(', ') || 'None' },
        { label: 'Dislikes', value: userProfile.dietaryPreferences.dislikes.join(', ') || 'None' },
        { label: 'Cuisine Preferences', value: userProfile.dietaryPreferences.cuisinePreferences.join(', ') }
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrition Targets',
      icon: <NutritionIcon size={20} color="#10b981" />,
      data: [
        { label: 'Daily Calories', value: `${userProfile.nutritionTargets.dailyCalories} kcal` },
        { label: 'Protein', value: `${userProfile.nutritionTargets.protein}g` },
        { label: 'Carbs', value: `${userProfile.nutritionTargets.carbs}g` },
        { label: 'Fats', value: `${userProfile.nutritionTargets.fats}g` },
        { label: 'Water Intake', value: `${userProfile.nutritionTargets.water}L` }
      ]
    }
  ];

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            navigation?.navigate('SignIn');
          }
        }
      ]
    );
  };

  // Profile Header Component
  const ProfileHeader = () => (
    <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
      <View className="items-center">
        <View className="relative mb-4">
          <Image 
            source={{ uri: userProfile.personalInfo.profileImage }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity 
            className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2"
            onPress={() => setShowImagePicker(true)}
          >
            <CameraIcon size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          {userProfile.personalInfo.name}
        </Text>
        <Text className="text-gray-600 mb-4">
          {userProfile.personalInfo.email}
        </Text>
        
        <View className="flex-row justify-between w-full">
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-emerald-600">
              {userProfile.physicalStats.weight}
            </Text>
            <Text className="text-gray-500 text-sm">Weight (kg)</Text>
          </View>
          
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-emerald-600">
              {userProfile.physicalStats.height}
            </Text>
            <Text className="text-gray-500 text-sm">Height (cm)</Text>
          </View>
          
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-emerald-600">
              {calculateBMI()}
            </Text>
            <Text className="text-gray-500 text-sm">BMI</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Section Card Component
  const SectionCard = ({ section }) => (
    <View className="bg-white rounded-3xl p-6 mb-4 shadow-sm border border-gray-50">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="bg-emerald-50 p-2 rounded-xl mr-3">
            {section.icon}
          </View>
          <Text className="text-lg font-semibold text-gray-900">
            {section.title}
          </Text>
        </View>
        
        <TouchableOpacity 
          className="bg-gray-50 p-2 rounded-xl"
          onPress={() => setEditingSection(section.id)}
        >
          <EditIcon size={16} color="#10b981" />
        </TouchableOpacity>
      </View>
      
      <View className="space-y-3">
        {section.data.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center">
            <Text className="text-gray-600 flex-1">{item.label}</Text>
            <Text className="text-gray-900 font-medium flex-1 text-right">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  // Quick Actions Component
  const QuickActions = () => (
    <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
      <Text className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</Text>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4 border-b border-gray-100"
        onPress={() => navigation?.navigate('Subscription')}
      >
        <View className="flex-row items-center">
                    <View className="bg-emerald-50 p-2 rounded-xl mr-3">
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 4.5V19.5M19.5 12H4.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
          <Text className="text-gray-700">Manage Subscription</Text>
        </View>
        <ArrowRightIcon size={16} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4 border-b border-gray-100"
        onPress={() => navigation?.navigate('WorkoutPlan')}
      >
        <View className="flex-row items-center">
          <View className="bg-emerald-50 p-2 rounded-xl mr-3">
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M17 3C17.7956 3 18.5587 3.31607 19.1213 3.87868C19.6839 4.44129 20 5.20435 20 6V18C20 18.7956 19.6839 19.5587 19.1213 20.1213C18.5587 20.6839 17.7956 21 17 21H7C6.20435 21 5.44129 20.6839 4.87868 20.1213C4.31607 19.5587 4 18.7956 4 18V6C4 5.20435 4.31607 4.44129 4.87868 4.87868C5.44129 3.31607 6.20435 3 7 3H17Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M12 7L10 12L12 17L14 12L12 7Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
          <Text className="text-gray-700">Workout Plans</Text>
        </View>
        <ArrowRightIcon size={16} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4 border-b border-gray-100"
        onPress={() => navigation?.navigate('MealPlans')}
      >
        <View className="flex-row items-center">
          <View className="bg-emerald-50 p-2 rounded-xl mr-3">
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 3C12 3 21 6 21 12C21 18 12 21 12 21C12 21 3 18 3 12C3 6 12 3 12 3Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
          <Text className="text-gray-700">Meal Plans</Text>
        </View>
        <ArrowRightIcon size={16} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4"
        onPress={handleLogout}
      >
        <View className="flex-row items-center">
          <View className="bg-red-50 p-2 rounded-xl mr-3">
            <LogoutIcon size={16} color="#ef4444" />
          </View>
          <Text className="text-red-600">Logout</Text>
        </View>
        <ArrowRightIcon size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  // Edit Modal Component
  const EditModal = () => (
    <Modal
      visible={editingSection !== null}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditingSection(null)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl p-6 w-11/12 max-h-3/4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Edit {profileSections.find(s => s.id === editingSection)?.title}
          </Text>
          
          <ScrollView className="mb-4">
            {editingSection === 'personal' && (
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-700 mb-2">Full Name</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                    value={userProfile.personalInfo.name}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      personalInfo: {...userProfile.personalInfo, name: text}
                    })}
                  />
                </View>
                <View>
                  <Text className="text-gray-700 mb-2">Email</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                    value={userProfile.personalInfo.email}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      personalInfo: {...userProfile.personalInfo, email: text}
                    })}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  <Text className="text-gray-700 mb-2">Phone</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                    value={userProfile.personalInfo.phone}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      personalInfo: {...userProfile.personalInfo, phone: text}
                    })}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            )}
            
            {editingSection === 'physical' && (
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-700 mb-2">Height (cm)</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                    value={userProfile.physicalStats.height.toString()}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      physicalStats: {...userProfile.physicalStats, height: parseInt(text) || 0}
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-700 mb-2">Current Weight (kg)</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                    value={userProfile.physicalStats.weight.toString()}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      physicalStats: {...userProfile.physicalStats, weight: parseInt(text) || 0}
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-700 mb-2">Target Weight (kg)</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                    value={userProfile.physicalStats.targetWeight.toString()}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      physicalStats: {...userProfile.physicalStats, targetWeight: parseInt(text) || 0}
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-700 mb-2">Activity Level</Text>
                  <View className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <Text>{userProfile.physicalStats.activityLevel}</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
          
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity 
              className="flex-1 bg-gray-100 p-4 rounded-xl"
              onPress={() => setEditingSection(null)}
            >
              <Text className="text-center text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-emerald-500 p-4 rounded-xl"
              onPress={() => setEditingSection(null)}
            >
              <Text className="text-center text-white font-semibold">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-3xl font-bold text-gray-900 mb-6">My Profile</Text>
        
        <ProfileHeader />
        
        {profileSections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
        
        <QuickActions />
      </ScrollView>
      
      <EditModal />
    </SafeAreaView>
  );
};

export default ProfileScreen;