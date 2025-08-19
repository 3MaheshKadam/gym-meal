import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // You'll need to install this
import Svg, { Path, Circle, G, Rect } from 'react-native-svg'; // You'll need to install react-native-svg

const { width, height } = Dimensions.get('window');

// Shield Check Icon for Security/Verification
const ShieldCheckIcon = ({ size = 60, color = "#16a085" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 1l3 3 3-1.5v6.5c0 5.25-3.25 7.5-6 7.5s-6-2.25-6-7.5V2.5L9 4l3-3z"
      stroke={color}
      strokeWidth="2"
      fill="rgba(22, 160, 133, 0.1)"
    />
    <Path
      d="M9 12l2 2 4-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Mail Icon
const MailIcon = ({ size = 40, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M22 6l-10 7L2 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Clock Icon for Timer
const ClockIcon = ({ size = 30, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

// Lock Icon for Security
const LockIcon = ({ size = 30, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2" fill="none"/>
  </Svg>
);

// Refresh Icon for Resend
const RefreshIcon = ({ size = 16, color = "#16a085" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3v5h5M21 21v-5h-5M20.49 9A9 9 0 0 0 5.64 5.64L3 3m18 18l-2.64-2.64A9 9 0 0 1 3.51 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function OTPScreen({ navigation, route }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { email } = route.params;
  
  // Create refs for each input
  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 6) {
      setError('');
      navigation.navigate('Tab');
    } else {
      setError('Please enter a 6-digit OTP');
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp('');
      setError('');
      // Add your resend OTP logic here
    }
  };

  const handleOTPChange = (text, index) => {
    const newOtp = otp.split('');
    newOtp[index] = text[0] || '';
    const otpString = newOtp.join('');
    setOtp(otpString);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when 6 digits are entered
    if (otpString.length === 6) {
      setTimeout(() => handleVerify(), 100);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <View className="absolute top-12 right-8 opacity-20">
              <MailIcon size={60} color="#ffffff" />
            </View>
            <View className="absolute top-20 left-6 opacity-10">
              <ClockIcon size={50} color="#ffffff" />
            </View>
            <View className="absolute top-32 right-16 opacity-15">
              <LockIcon size={40} color="#ffffff" />
            </View>

            {/* Main Verification Icon */}
            <View className="items-center mt-8">
              <View className="w-28 h-28 bg-white/90 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                <ShieldCheckIcon size={60} color="#16a085" />
              </View>
              <Text className="text-4xl font-bold text-white mb-2 text-center">
                Verify Account
              </Text>
              <Text className="text-white/80 text-lg text-center mb-2">
                Security Code Verification
              </Text>
              <View className="bg-white/20 rounded-2xl px-4 py-2">
                <Text className="text-white/90 text-center text-sm">
                  Code sent to: <Text className="font-semibold">{email}</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6 -mt-4">
            <View className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
              <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
                Enter Verification Code
              </Text>
              <Text className="text-gray-500 text-center mb-8">
                Enter the 6-digit code we sent to your email
              </Text>

              {error ? (
                <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
                  <Text className="text-red-600 text-center font-medium">{error}</Text>
                </View>
              ) : null}

              {/* OTP Input Fields */}
              <View className="flex-row justify-between mb-8 px-2">
                {Array(6).fill().map((_, index) => (
                  <TextInput
                    key={index}
                    ref={ref => inputRefs.current[index] = ref}
                    className={`w-12 h-14 border-2 text-center rounded-xl text-lg font-bold ${
                      otp[index] 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 bg-gray-50 text-gray-800'
                    } focus:border-green-500 focus:bg-white shadow-sm`}
                    value={otp[index] || ''}
                    onChangeText={(text) => handleOTPChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1}
                    keyboardType="numeric"
                    autoComplete="one-time-code"
                    textContentType="oneTimeCode"
                  />
                ))}
              </View>

              {/* Timer and Resend */}
              <View className="flex-row justify-center items-center mb-8">
                <ClockIcon size={16} color={canResend ? "#16a085" : "#9CA3AF"} />
                <Text className={`ml-2 font-medium ${
                  canResend ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {canResend ? "Code Expired" : `Expires in ${formatTime(timer)}`}
                </Text>
              </View>

              {/* Verify Button */}
              <TouchableOpacity
                className={`p-4 rounded-xl items-center mb-4 shadow-lg active:scale-95 ${
                  otp.length === 6 
                    ? 'bg-gradient-to-r from-green-600 to-green-500' 
                    : 'bg-gray-300'
                }`}
                onPress={handleVerify}
                activeOpacity={0.8}
                disabled={otp.length !== 6}
              >
                <Text className={`font-bold text-lg ${
                  otp.length === 6 ? 'text-white' : 'text-gray-500'
                }`}>
                  {otp.length === 6 ? 'Verify Account' : `Enter ${6 - otp.length} more digits`}
                </Text>
              </TouchableOpacity>

              {/* Resend Section */}
              <View className="items-center">
                <Text className="text-gray-500 text-sm mb-3">
                  Didnt receive the code?
                </Text>
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={!canResend}
                  className={`flex-row items-center px-4 py-2 rounded-lg ${
                    canResend ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <RefreshIcon size={16} color={canResend ? "#16a085" : "#9CA3AF"} />
                  <Text className={`ml-2 font-medium ${
                    canResend ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Security Notice */}
            <View className="bg-white/10 rounded-2xl p-4 mb-6">
              <View className="flex-row items-center justify-center mb-2">
                <LockIcon size={20} color="#ffffff" />
                <Text className="text-white font-semibold ml-2">
                  Secure Verification
                </Text>
              </View>
              <Text className="text-white/80 text-center text-xs leading-4">
                This code expires in 1 minute. Never share your verification code with anyone.
              </Text>
            </View>

           
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
