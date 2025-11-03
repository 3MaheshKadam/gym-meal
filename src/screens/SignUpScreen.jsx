import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Enhanced Dumbbell Icon
const DumbbellIcon = ({ size = 40, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
      fill={color}
    />
    <Circle cx="6" cy="12" r="2.5" fill={color}/>
    <Circle cx="18" cy="12" r="2.5" fill={color}/>
  </Svg>
);

// Fire Icon
const FireIcon = ({ size = 30, color = "#ff6b35" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"
      fill={color}
    />
  </Svg>
);

// Lightning Icon
const LightningIcon = ({ size = 30, color = "#ffd93d" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill={color} />
  </Svg>
);

// User Icon
const UserIcon = ({ size = 24, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

// Email Icon
const EmailIcon = ({ size = 24, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill={color}
    />
  </Svg>
);

// Phone Icon
const PhoneIcon = ({ size = 24, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z"
      fill={color}
    />
  </Svg>
);

// Eye Icon
const EyeIcon = ({ size = 24, color = "#6b7280", crossed = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
      fill={color}
    />
    {crossed && (
      <Path
        d="M2 2L22 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    )}
  </Svg>
);

// User Plus Icon (for logo)
const UserPlusIcon = ({ size = 60, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="9"
      cy="7"
      r="4"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M19 8v6M22 11h-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = () => {
    if (name && email && phone && password) {
      setError('');
      navigation.navigate('OTP', { email });
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
      <LinearGradient
        colors={['#0a0e27', '#1a1f3a', '#2d1b4e']}
        locations={[0, 0.5, 1]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {/* Hero Section with Floating Elements */}
            <View className="relative pt-10 pb-4">
              {/* Animated background elements */}
              <View className="absolute top-6 right-6 opacity-10">
                <FireIcon size={100} color="#ff6b35" />
              </View>
              <View className="absolute top-20 left-8 opacity-10">
                <LightningIcon size={70} color="#ffd93d" />
              </View>
              <View className="absolute top-32 right-16 opacity-10">
                <DumbbellIcon size={60} color="#00d4ff" />
              </View>

              {/* Logo and Branding */}
              <View className="items-center mt-4 px-6">
                <View className="relative mb-4">
                  <View className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12">
                    <View className="transform -rotate-12">
                      <UserPlusIcon size={40} color="#ffffff" />
                    </View>
                  </View>
                  <View className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center">
                    <FireIcon size={16} color="#ffffff" />
                  </View>
                </View>

                <Text className="text-4xl font-black text-white mb-2 tracking-tight">
                  JOIN FITLIFE
                </Text>
                <View className="flex-row items-center space-x-2">
                  <View className="w-10 h-1 bg-orange-500 rounded-full" />
                  <LightningIcon size={14} color="#ffd93d" />
                  <View className="w-10 h-1 bg-orange-500 rounded-full" />
                </View>
                <Text className="text-gray-400 text-sm mt-2 font-medium tracking-wide">
                  START YOUR TRANSFORMATION
                </Text>
              </View>
            </View>

            {/* Main Form Card */}
            <View className="px-5 mt-2">
              <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl">
                {/* Welcome Message */}
                <View className="mb-5">
                  <Text className="text-2xl font-black text-white mb-1">
                    Create Account
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    Let&apos;s get you started! 🚀
                  </Text>
                </View>

                {error ? (
                  <View className="bg-red-500/20 border-2 border-red-500 rounded-2xl p-3 mb-4 flex-row items-center">
                    <Text className="text-red-300 font-bold flex-1">⚠️ {error}</Text>
                  </View>
                ) : null}

                {/* Full Name Input */}
                <View className="mb-3">
                  <Text className="text-white font-bold mb-2 ml-1 text-xs tracking-wide">
                    FULL NAME
                  </Text>
                  <View className="relative bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
                    <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                      <UserIcon size={20} color="#9ca3af" />
                    </View>
                    <TextInput
                      className="pl-12 pr-4 py-4 text-white text-base"
                      value={name}
                      onChangeText={setName}
                      placeholder="John Doe"
                      placeholderTextColor="#6b7280"
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View className="mb-3">
                  <Text className="text-white font-bold mb-2 ml-1 text-xs tracking-wide">
                    EMAIL
                  </Text>
                  <View className="relative bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
                    <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                      <EmailIcon size={20} color="#9ca3af" />
                    </View>
                    <TextInput
                      className="pl-12 pr-4 py-4 text-white text-base"
                      value={email}
                      onChangeText={setEmail}
                      placeholder="your.email@example.com"
                      placeholderTextColor="#6b7280"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Phone Input */}
                <View className="mb-3">
                  <Text className="text-white font-bold mb-2 ml-1 text-xs tracking-wide">
                    PHONE NUMBER
                  </Text>
                  <View className="relative bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
                    <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                      <PhoneIcon size={20} color="#9ca3af" />
                    </View>
                    <TextInput
                      className="pl-12 pr-4 py-4 text-white text-base"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="+1 (555) 000-0000"
                      placeholderTextColor="#6b7280"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2 ml-1 text-xs tracking-wide">
                    PASSWORD
                  </Text>
                  <View className="relative bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
                    <TextInput
                      className="pl-4 pr-14 py-4 text-white text-base"
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Create strong password"
                      placeholderTextColor="#6b7280"
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-4 top-0 bottom-0 justify-center"
                    >
                      <EyeIcon size={22} color="#9ca3af" crossed={!isPasswordVisible} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Terms and Conditions */}
                <View className="mb-5">
                  <Text className="text-xs text-gray-400 text-center leading-4">
                    By signing up, you agree to our{' '}
                    <Text className="text-orange-400 font-semibold">Terms</Text>
                    {' '}and{' '}
                    <Text className="text-orange-400 font-semibold">Privacy Policy</Text>
                  </Text>
                </View>

                {/* Sign Up Button with Gradient */}
                <TouchableOpacity
                  onPress={handleSignUp}
                  activeOpacity={0.8}
                  className="mb-4 overflow-hidden rounded-2xl shadow-xl"
                >
                  <LinearGradient
                    colors={['#ff6b35', '#f7931e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-5 items-center"
                  >
                    <Text className="text-white font-black text-lg tracking-wide">
                      CREATE ACCOUNT →
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center mb-4">
                  <View className="flex-1 h-px bg-white/20" />
                  <Text className="mx-4 text-gray-400 font-bold text-xs">OR</Text>
                  <View className="flex-1 h-px bg-white/20" />
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignIn')}
                  className="border-2 border-orange-500 rounded-2xl py-4 items-center bg-orange-500/10"
                >
                  <Text className="text-orange-400 font-black text-base tracking-wide">
                    ALREADY HAVE ACCOUNT?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Benefits Section */}
              <View className="mt-6 mb-6">
                <Text className="text-white font-black text-center text-lg mb-4 tracking-wide">
                  WHAT YOU GET
                </Text>
                <View className="flex-row justify-between px-2">
                  <View className="items-center flex-1">
                    <View className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                      <DumbbellIcon size={28} color="#ffffff" />
                    </View>
                    <Text className="text-white font-bold text-xs">WORKOUTS</Text>
                    <Text className="text-gray-500 text-xs">500+ Plans</Text>
                  </View>
                  
                  <View className="items-center flex-1">
                    <View className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                      <FireIcon size={28} color="#ffffff" />
                    </View>
                    <Text className="text-white font-bold text-xs">NUTRITION</Text>
                    <Text className="text-gray-500 text-xs">1000+ Meals</Text>
                  </View>
                  
                  <View className="items-center flex-1">
                    <View className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                      <LightningIcon size={28} color="#ffffff" />
                    </View>
                    <Text className="text-white font-bold text-xs">TRACKING</Text>
                    <Text className="text-gray-500 text-xs">AI Powered</Text>
                  </View>
                </View>
              </View>

              {/* Community Message */}
              <View className="bg-gradient-to-r from-orange-500/20 to-pink-600/20 border-2 border-orange-500/30 rounded-2xl p-4 mb-6">
                <Text className="text-white text-center font-bold text-sm">
                  🎉 Join 50K+ Fitness Enthusiasts
                </Text>
                <Text className="text-gray-400 text-center text-xs mt-1">
                  Start your transformation journey today!
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}