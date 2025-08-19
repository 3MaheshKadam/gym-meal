import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // You'll need to install this
import Svg, { Path, Circle, G } from 'react-native-svg'; // You'll need to install react-native-svg

const { width, height } = Dimensions.get('window');

// Custom Fitness Icon Component
const FitnessIcon = ({ size = 60, color = "#16a085" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
      fill={color}
    />
  </Svg>
);

// Dumbbell Icon Component
const DumbbellIcon = ({ size = 40, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
      fill={color}
    />
    <Circle cx="6" cy="12" r="2" fill={color}/>
    <Circle cx="18" cy="12" r="2" fill={color}/>
    <Path d="M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

// Apple Icon for Diet
const AppleIcon = ({ size = 30, color = "#e74c3c" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13L13.5 7C14.1 6.2 15 5.7 16 5.7C17.9 5.7 19.4 7.2 19.4 9H21ZM9 9C9 7.2 10.6 5.7 12.5 5.7C13.5 5.7 14.4 6.2 15 7L13.5 13L7.5 7C8.1 6.2 9 5.7 10 5.7H9ZM12 8C10.3 8 9 9.8 9 12V22H15V12C15 9.8 13.7 8 12 8Z"
      fill={color}
    />
  </Svg>
);

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignIn = () => {
    if (email && password) {
      setError('');
      // Add your sign-in logic here
      navigation.navigate('Tab');
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#16a085" />
      <LinearGradient
        colors={['#16a085', '#2ecc71', '#27ae60']}
        locations={[0, 0.6, 1]}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header Section with Background Pattern */}
          <View className="relative pt-16 pb-8 px-6">
            {/* Decorative Elements */}
            <View className="absolute top-10 right-8 opacity-20">
              <DumbbellIcon size={80} color="#ffffff" />
            </View>
            <View className="absolute top-20 left-4 opacity-10">
              <AppleIcon size={60} color="#ffffff" />
            </View>
            <View className="absolute top-32 right-12 opacity-15">
              <FitnessIcon size={50} color="#ffffff" />
            </View>

            {/* Main Logo */}
            <View className="items-center mt-8">
              <View className="w-28 h-28 bg-white/90 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                <DumbbellIcon size={60} color="#16a085" />
              </View>
              <Text className="text-4xl font-bold text-white mb-2 text-center">
                FitLife
              </Text>
              <Text className="text-white/80 text-lg text-center">
                Your Fitness Journey Starts Here
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6 -mt-4">
            <View className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
              <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
                Welcome Back
              </Text>

              {error ? (
                <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                  <Text className="text-red-600 text-center font-medium">{error}</Text>
                </View>
              ) : null}

              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Email Address
                </Text>
                <View className="relative">
                  <TextInput
                    className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 ml-1">
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!isPasswordVisible}
                  />
                </View>
              </View>

            {/* Sign In Button */}
<TouchableOpacity
  className="bg-green-600 p-4 rounded-xl items-center mb-4 shadow-lg active:scale-95"
  onPress={handleSignIn}
  activeOpacity={0.8}
>
  <Text className="text-white font-bold text-lg">
    Sign In
  </Text>
</TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity className="mb-4">
                <Text className="text-center text-green-600 font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mb-4">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-4 text-gray-500 font-medium">OR</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Sign Up Link */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('SignUp')}
                className="border-2 border-green-500 p-4 rounded-xl items-center"
              >
                <Text className="text-green-600 font-bold text-lg">
                  Create New Account
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer Icons */}
            <View className="flex-row justify-center items-center space-x-8 mb-8">
              <View className="items-center">
                <DumbbellIcon size={30} color="#ffffff" />
                <Text className="text-white/80 text-xs mt-1">Workouts</Text>
              </View>
              <View className="items-center">
                <AppleIcon size={30} color="#ffffff" />
                <Text className="text-white/80 text-xs mt-1">Nutrition</Text>
              </View>
              <View className="items-center">
                <FitnessIcon size={30} color="#ffffff" />
                <Text className="text-white/80 text-xs mt-1">Tracking</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}