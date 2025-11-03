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
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      height: 175,
      weight: 75,
      targetWeight: 70,
      bodyFat: 15,
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
    },
    nutritionTargets: {
      dailyCalories: 1800,
      protein: 135,
      carbs: 180,
      fats: 60,
      water: 3.5
    }
  });

  const [editingSection, setEditingSection] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Enhanced Icons
  const UserIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const StatsIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 3H15M3 8H21M5 8L7 19C7 19.5304 7.21071 20.0391 7.58579 20.4142C7.96086 20.7893 8.46957 21 9 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19L19 8M10 12V17M14 12V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const TargetIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2"/>
      <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const HeartIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.5487 7.04096 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

  const EditIcon = ({ size = 20, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const CameraIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const ArrowRightIcon = ({ size = 20, color = "#9ca3af" }) => (
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

  const LightningIcon = ({ size = 24, color = "#ffd93d" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill={color} />
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
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { status: 'Normal', color: 'text-green-400' };
    if (bmi < 30) return { status: 'Overweight', color: 'text-orange-400' };
    return { status: 'Obese', color: 'text-red-400' };
  };

  // Profile sections data
  const profileSections = [
    {
      id: 'personal',
      title: 'Personal Info',
      icon: <UserIcon size={20} color="#ffffff" />,
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
      icon: <StatsIcon size={20} color="#ffffff" />,
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
      icon: <TargetIcon size={20} color="#ffffff" />,
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
      icon: <HeartIcon size={20} color="#ffffff" />,
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
      icon: <FireIcon size={20} color="#ffffff" />,
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
            navigation?.navigate('SignIn');
          }
        }
      ]
    );
  };

  // Profile Header Component
  const ProfileHeader = () => (
    <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-5 border border-white/20">
      <View className="items-center">
        <View className="relative mb-4">
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 4, borderRadius: 60 }}
          >
            <Image 
              source={{ uri: userProfile.personalInfo.profileImage }}
              style={{ width: 112, height: 112, borderRadius: 56 }}
            />
          </LinearGradient>
          <TouchableOpacity 
            onPress={() => setShowImagePicker(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#10b981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 10,
                borderRadius: 20,
              }}
            >
              <CameraIcon size={16} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <Text className="text-2xl font-black text-white mb-1 tracking-tight">
          {userProfile.personalInfo.name.toUpperCase()}
        </Text>
        <Text className="text-gray-300 mb-4 font-semibold">
          {userProfile.personalInfo.email}
        </Text>
        
        <View className="flex-row justify-between w-full">
          <View className="items-center flex-1">
            <LinearGradient
              colors={['#ff6b35', '#f7931e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, marginBottom: 4 }}
            >
              <Text className="text-2xl font-black text-white">
                {userProfile.physicalStats.weight}
              </Text>
            </LinearGradient>
            <Text className="text-gray-400 text-xs font-bold">WEIGHT (KG)</Text>
          </View>
          
          <View className="items-center flex-1">
            <LinearGradient
              colors={['#ff6b35', '#f7931e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, marginBottom: 4 }}
            >
              <Text className="text-2xl font-black text-white">
                {userProfile.physicalStats.height}
              </Text>
            </LinearGradient>
            <Text className="text-gray-400 text-xs font-bold">HEIGHT (CM)</Text>
          </View>
          
          <View className="items-center flex-1">
            <LinearGradient
              colors={['#ff6b35', '#f7931e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, marginBottom: 4 }}
            >
              <Text className="text-2xl font-black text-white">
                {calculateBMI()}
              </Text>
            </LinearGradient>
            <Text className="text-gray-400 text-xs font-bold">BMI</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Section Card Component
  const SectionCard = ({ section }) => (
    <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-4 border border-white/20">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mr-3 items-center justify-center">
            {section.icon}
          </View>
          <Text className="text-lg font-black text-white tracking-wide">
            {section.title.toUpperCase()}
          </Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => setEditingSection(section.id)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#10b981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 8, borderRadius: 12 }}
          >
            <EditIcon size={14} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <View className="space-y-3">
        {section.data.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center py-2 border-b border-white/10 last:border-b-0">
            <Text className="text-gray-300 flex-1 font-semibold">{item.label}</Text>
            <Text className="text-white font-bold flex-1 text-right">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  // Quick Actions Component
  const QuickActions = () => (
    <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
      <Text className="text-lg font-black text-white mb-4 tracking-wide">QUICK ACTIONS</Text>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4 border-b border-white/10"
        onPress={() => navigation?.navigate('Subscription')}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 8, borderRadius: 12, marginRight: 12 }}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 4.5V19.5M19.5 12H4.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </LinearGradient>
          <Text className="text-white font-bold">Manage Subscription</Text>
        </View>
        <ArrowRightIcon size={16} color="#9ca3af" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4 border-b border-white/10"
        onPress={() => navigation?.navigate('Meals')}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <LinearGradient
            colors={['#10b981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 8, borderRadius: 12, marginRight: 12 }}
          >
            <FireIcon size={16} color="#ffffff" />
          </LinearGradient>
          <Text className="text-white font-bold">Meal Plans</Text>
        </View>
        <ArrowRightIcon size={16} color="#9ca3af" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4 border-b border-white/10"
        onPress={() => navigation?.navigate('Deliveries')}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <LinearGradient
            colors={['#3b82f6', '#60a5fa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 8, borderRadius: 12, marginRight: 12 }}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M1 3H15V13H1V3Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M16 8H20L23 11V16H16V8Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Circle cx="5.5" cy="18.5" r="2.5" stroke="#ffffff" strokeWidth="2"/>
              <Circle cx="18.5" cy="18.5" r="2.5" stroke="#ffffff" strokeWidth="2"/>
            </Svg>
          </LinearGradient>
          <Text className="text-white font-bold">Deliveries</Text>
        </View>
        <ArrowRightIcon size={16} color="#9ca3af" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4"
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <View className="bg-red-500/20 border border-red-500/40 p-2 rounded-xl mr-3">
            <LogoutIcon size={16} color="#ef4444" />
          </View>
          <Text className="text-red-400 font-bold">Logout</Text>
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
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <View className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 w-11/12 max-h-3/4 border-2 border-orange-500">
          <Text className="text-xl font-black text-white mb-4 tracking-wide">
            EDIT {profileSections.find(s => s.id === editingSection)?.title.toUpperCase()}
          </Text>
          
          <ScrollView className="mb-4">
            {editingSection === 'personal' && (
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-300 mb-2 font-bold text-xs tracking-wide">FULL NAME</Text>
                  <TextInput
                    className="bg-white/10 border border-white/20 p-4 rounded-xl text-white"
                    placeholderTextColor="#6b7280"
                    value={userProfile.personalInfo.name}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      personalInfo: {...userProfile.personalInfo, name: text}
                    })}
                  />
                </View>
                <View>
                  <Text className="text-gray-300 mb-2 font-bold text-xs tracking-wide">EMAIL</Text>
                  <TextInput
                    className="bg-white/10 border border-white/20 p-4 rounded-xl text-white"
                    placeholderTextColor="#6b7280"
                    value={userProfile.personalInfo.email}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      personalInfo: {...userProfile.personalInfo, email: text}
                    })}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  <Text className="text-gray-300 mb-2 font-bold text-xs tracking-wide">PHONE</Text>
                  <TextInput
                    className="bg-white/10 border border-white/20 p-4 rounded-xl text-white"
                    placeholderTextColor="#6b7280"
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
                  <Text className="text-gray-300 mb-2 font-bold text-xs tracking-wide">HEIGHT (CM)</Text>
                  <TextInput
                    className="bg-white/10 border border-white/20 p-4 rounded-xl text-white"
                    placeholderTextColor="#6b7280"
                    value={userProfile.physicalStats.height.toString()}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      physicalStats: {...userProfile.physicalStats, height: parseInt(text) || 0}
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-300 mb-2 font-bold text-xs tracking-wide">CURRENT WEIGHT (KG)</Text>
                  <TextInput
                    className="bg-white/10 border border-white/20 p-4 rounded-xl text-white"
                    placeholderTextColor="#6b7280"
                    value={userProfile.physicalStats.weight.toString()}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      physicalStats: {...userProfile.physicalStats, weight: parseInt(text) || 0}
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-300 mb-2 font-bold text-xs tracking-wide">TARGET WEIGHT (KG)</Text>
                  <TextInput
                    className="bg-white/10 border border-white/20 p-4 rounded-xl text-white"
                    placeholderTextColor="#6b7280"
                    value={userProfile.physicalStats.targetWeight.toString()}
                    onChangeText={(text) => setUserProfile({
                      ...userProfile,
                      physicalStats: {...userProfile.physicalStats, targetWeight: parseInt(text) || 0}
                    })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
          </ScrollView>
          
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity 
              className="flex-1 bg-white/10 border border-white/20 p-4 rounded-xl"
              onPress={() => setEditingSection(null)}
              activeOpacity={0.7}
            >
              <Text className="text-center text-white font-bold">CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 overflow-hidden rounded-xl"
              onPress={() => setEditingSection(null)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 16 }}
              >
                <Text className="text-center text-white font-black">SAVE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
          <Text className="text-3xl font-black text-white tracking-tight">MY PROFILE</Text>
          <View className="flex-row items-center mt-1">
            <View className="w-8 h-1 bg-orange-500 rounded-full mr-1" />
            <LightningIcon size={12} color="#ffd93d" />
            <View className="w-8 h-1 bg-orange-500 rounded-full ml-1" />
          </View>
        </View>
        
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 80 }}
        >
          <ProfileHeader />
          
          {profileSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
          
          <QuickActions />
        </ScrollView>
      </SafeAreaView>
      
      <EditModal />
    </LinearGradient>
  );
};

export default ProfileScreen;