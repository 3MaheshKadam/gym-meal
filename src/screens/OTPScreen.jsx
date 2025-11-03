import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const OTPScreen = ({ route, navigation }) => {
  const { email } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Icons
  const ShieldIcon = ({ size = 60, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12L11 14L15 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const ArrowLeftIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M12 19L5 12L12 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const LightningIcon = ({ size = 24, color = "#ffd93d" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill={color} />
    </Svg>
  );

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    // Simulate OTP verification
    Alert.alert(
      'Success',
      'OTP verified successfully!',
      [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('Tab')
        }
      ]
    );
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('Success', 'OTP has been resent to your email');
  };

  return (
    <LinearGradient
      colors={['#0a0e27', '#1a1f3a', '#2d1b4e']}
      locations={[0, 0.5, 1]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {/* Header */}
          <View className="px-6 pt-4 pb-8">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white/10 border border-white/20 p-3 rounded-xl self-start"
              activeOpacity={0.7}
            >
              <ArrowLeftIcon size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View className="flex-1 px-6">
            {/* Logo Section */}
            <View className="items-center mb-8">
              <View className="relative mb-6">
                <View className="w-28 h-28 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
                  <View className="transform -rotate-12">
                    <ShieldIcon size={64} color="#ffffff" />
                  </View>
                </View>
                <View className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <LightningIcon size={20} color="#ffffff" />
                </View>
              </View>

              <Text className="text-4xl font-black text-white mb-2 tracking-tight text-center">
                VERIFY OTP
              </Text>
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-1 bg-orange-500 rounded-full mr-2" />
                <LightningIcon size={14} color="#ffd93d" />
                <View className="w-12 h-1 bg-orange-500 rounded-full ml-2" />
              </View>
              <Text className="text-gray-300 text-base text-center font-semibold px-4">
                Enter the 6-digit code sent to
              </Text>
              <Text className="text-orange-400 text-base font-black mt-1">
                {email || 'your email'}
              </Text>
            </View>

            {/* OTP Input Section */}
            <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20">
              <View className="flex-row justify-between mb-6">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="bg-white/5 border-2 border-white/20 rounded-2xl text-center font-black text-white text-2xl"
                    style={{ width: 50, height: 60 }}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>

              {/* Timer */}
              <View className="items-center mb-4">
                {!canResend ? (
                  <Text className="text-gray-400 text-sm font-semibold">
                    Resend code in{' '}
                    <Text className="text-orange-400 font-black">{timer}s</Text>
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                    <Text className="text-orange-400 font-black text-sm">
                      RESEND CODE →
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={handleVerify}
              activeOpacity={0.8}
              className="mb-6 overflow-hidden rounded-2xl"
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
                  VERIFY OTP →
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Security Info */}
            <View className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-2 border-blue-500/30 rounded-2xl p-4">
              <Text className="text-white font-bold text-sm text-center">
                🔒 Secure Verification
              </Text>
              <Text className="text-gray-300 text-xs text-center mt-2">
                Your information is protected with end-to-end encryption
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OTPScreen;