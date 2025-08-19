// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Dimensions } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // You'll need to install this
// import Svg, { Path, Circle, G, Rect } from 'react-native-svg'; // You'll need to install react-native-svg

// const { width, height } = Dimensions.get('window');

// // Custom Fitness Icon Component
// const FitnessIcon = ({ size = 60, color = "#16a085" }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
//       fill={color}
//     />
//   </Svg>
// );

// // Meal/Nutrition Icon Component
// const NutritionIcon = ({ size = 40, color = "#ffffff" }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M12 2L13.09 8.26L15 7L14.5 9.5L17 9L16.5 11.5L19 11L18.5 13.5L21 13L20.5 15.5L22 15L21.5 17L19 17.5L16.5 18L14 18.5L11.5 19L9 19.5L6.5 20L4 20.5L2 21V19L4 18.5L6.5 18L9 17.5L11.5 17L14 16.5L16.5 16L19 15.5L21.5 15L22 13L19 13.5L16.5 14L14 14.5L11.5 15L9 15.5L6.5 16L4 16.5L2 17V15L4 14.5L6.5 14L9 13.5L11.5 13L12 2Z"
//       fill={color}
//     />
//     <Circle cx="8" cy="8" r="2" fill={color}/>
//     <Circle cx="16" cy="8" r="2" fill={color}/>
//     <Path d="M12 14c2 0 4-1 4-3H8c0 2 2 3 4 3z" fill={color}/>
//   </Svg>
// );

// // Heart Rate Icon
// const HeartIcon = ({ size = 30, color = "#e74c3c" }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//       fill={color}
//     />
//   </Svg>
// );

// // Progress Icon
// const ProgressIcon = ({ size = 30, color = "#ffffff" }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
//     <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
//   </Svg>
// );

// // User Plus Icon for Sign Up
// const UserPlusIcon = ({ size = 60, color = "#16a085" }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
//       stroke={color}
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Circle
//       cx="9"
//       cy="7"
//       r="4"
//       stroke={color}
//       strokeWidth="2"
//       fill="none"
//     />
//     <Path
//       d="M19 8v6M22 11h-6"
//       stroke={color}
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const handleSignUp = () => {
//     if (name && email && phone && password) {
//       setError('');
//       navigation.navigate('OTP', { email });
//     } else {
//       setError('Please fill all fields');
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#16a085" />
//       <LinearGradient
//         colors={['#16a085', '#2ecc71', '#27ae60']}
//         locations={[0, 0.6, 1]}
//         className="flex-1"
//       >
//         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//           {/* Header Section with Background Pattern */}
//           <View className="relative pt-12 pb-6 px-6">
//             {/* Decorative Elements */}
//             <View className="absolute top-8 right-6 opacity-20">
//               <NutritionIcon size={70} color="#ffffff" />
//             </View>
//             <View className="absolute top-16 left-4 opacity-10">
//               <HeartIcon size={50} color="#ffffff" />
//             </View>
//             <View className="absolute top-28 right-16 opacity-15">
//               <ProgressIcon size={45} color="#ffffff" />
//             </View>
//             <View className="absolute top-6 left-12 opacity-10">
//               <FitnessIcon size={40} color="#ffffff" />
//             </View>

//             {/* Main Logo */}
//             <View className="items-center mt-6">
//               <View className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center mb-4 shadow-2xl">
//                 <UserPlusIcon size={50} color="#16a085" />
//               </View>
//               <Text className="text-3xl font-bold text-white mb-1 text-center">
//                 Join FitLife
//               </Text>
//               <Text className="text-white/80 text-base text-center mb-2">
//                 Start Your Transformation Today
//               </Text>
//               {/* Progress Bar */}
//               <View className="w-20 h-1 bg-white/30 rounded-full overflow-hidden">
//                 <View className="w-full h-full bg-white rounded-full" />
//               </View>
//             </View>
//           </View>

//           {/* Form Section */}
//           <View className="flex-1 px-6 -mt-2">
//             <View className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
//               <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
//                 Create Account
//               </Text>

//               {error ? (
//                 <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
//                   <Text className="text-red-600 text-center font-medium">{error}</Text>
//                 </View>
//               ) : null}

//               {/* Full Name Input */}
//               <View className="mb-4">
//                 <Text className="text-gray-700 font-semibold mb-2 ml-1">
//                   Full Name
//                 </Text>
//                 <View className="relative">
//                   <TextInput
//                     className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
//                     value={name}
//                     onChangeText={setName}
//                     placeholder="Enter your full name"
//                     placeholderTextColor="#9CA3AF"
//                     autoCapitalize="words"
//                   />
//                 </View>
//               </View>

//               {/* Email Input */}
//               <View className="mb-4">
//                 <Text className="text-gray-700 font-semibold mb-2 ml-1">
//                   Email Address
//                 </Text>
//                 <View className="relative">
//                   <TextInput
//                     className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="Enter your email"
//                     placeholderTextColor="#9CA3AF"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>

//               {/* Phone Input */}
//               <View className="mb-4">
//                 <Text className="text-gray-700 font-semibold mb-2 ml-1">
//                   Phone Number
//                 </Text>
//                 <View className="relative">
//                   <TextInput
//                     className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
//                     value={phone}
//                     onChangeText={setPhone}
//                     placeholder="Enter your phone number"
//                     placeholderTextColor="#9CA3AF"
//                     keyboardType="phone-pad"
//                   />
//                 </View>
//               </View>

//               {/* Password Input */}
//               <View className="mb-6">
//                 <Text className="text-gray-700 font-semibold mb-2 ml-1">
//                   Password
//                 </Text>
//                 <View className="relative">
//                   <TextInput
//                     className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Create a strong password"
//                     placeholderTextColor="#9CA3AF"
//                     secureTextEntry={!isPasswordVisible}
//                   />
//                 </View>
//               </View>

//               {/* Terms and Conditions */}
//               <View className="mb-6">
//                 <Text className="text-xs text-gray-500 text-center leading-4">
//                   By signing up, you agree to our{' '}
//                   <Text className="text-green-600 font-medium">Terms of Service</Text>
//                   {' '}and{' '}
//                   <Text className="text-green-600 font-medium">Privacy Policy</Text>
//                 </Text>
//               </View>

//             {/* Sign Up Button */}
// <TouchableOpacity
//   onPress={handleSignUp}
//   activeOpacity={0.8}
//   className="bg-green-600 p-4 rounded-xl items-center mb-4 shadow-lg active:scale-95"
// >
//   <Text className="text-white font-bold text-lg">
//     Create Account
//   </Text>
// </TouchableOpacity>


//               {/* Divider */}
//               <View className="flex-row items-center mb-4">
//                 <View className="flex-1 h-px bg-gray-200" />
//                 <Text className="mx-4 text-gray-500 font-medium">OR</Text>
//                 <View className="flex-1 h-px bg-gray-200" />
//               </View>

//               {/* Sign In Link */}
//               <TouchableOpacity 
//                 onPress={() => navigation.navigate('SignIn')}
//                 className="border-2 border-green-500 p-4 rounded-xl items-center"
//               >
//                 <Text className="text-green-600 font-bold text-lg">
//                   Already Have Account? Sign In
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Footer Features */}
//             <View className="flex-row justify-center items-center space-x-8 mb-8">
//               <View className="items-center">
//                 <NutritionIcon size={28} color="#ffffff" />
//                 <Text className="text-white/80 text-xs mt-1">Meal Plans</Text>
//               </View>
//               <View className="items-center">
//                 <HeartIcon size={28} color="#ffffff" />
//                 <Text className="text-white/80 text-xs mt-1">Health Track</Text>
//               </View>
//               <View className="items-center">
//                 <ProgressIcon size={28} color="#ffffff" />
//                 <Text className="text-white/80 text-xs mt-1">Progress</Text>
//               </View>
//             </View>

//             {/* Welcome Message */}
//             <View className="bg-white/10 rounded-2xl p-4 mb-6">
//               <Text className="text-white text-center text-sm">
//                 🎉 <Text className="font-semibold">Welcome to the FitLife Community!</Text>
//               </Text>
//               <Text className="text-white/80 text-center text-xs mt-1">
//                 Join thousands on their fitness journey
//               </Text>
//             </View>
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </>
//   );
// }
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // You'll need to install this
import Svg, { Path, Circle, G, Rect } from 'react-native-svg'; // You'll need to install react-native-svg

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

// Meal/Nutrition Icon Component
const NutritionIcon = ({ size = 40, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L13.09 8.26L15 7L14.5 9.5L17 9L16.5 11.5L19 11L18.5 13.5L21 13L20.5 15.5L22 15L21.5 17L19 17.5L16.5 18L14 18.5L11.5 19L9 19.5L6.5 20L4 20.5L2 21V19L4 18.5L6.5 18L9 17.5L11.5 17L14 16.5L16.5 16L19 15.5L21.5 15L22 13L19 13.5L16.5 14L14 14.5L11.5 15L9 15.5L6.5 16L4 16.5L2 17V15L4 14.5L6.5 14L9 13.5L11.5 13L12 2Z"
      fill={color}
    />
    <Circle cx="8" cy="8" r="2" fill={color}/>
    <Circle cx="16" cy="8" r="2" fill={color}/>
    <Path d="M12 14c2 0 4-1 4-3H8c0 2 2 3 4 3z" fill={color}/>
  </Svg>
);

// Heart Rate Icon
const HeartIcon = ({ size = 30, color = "#e74c3c" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
    />
  </Svg>
);

// Progress Icon
const ProgressIcon = ({ size = 30, color = "#ffffff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

// User Plus Icon for Sign Up
const UserPlusIcon = ({ size = 60, color = "#16a085" }) => (
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
      <StatusBar barStyle="light-content" backgroundColor="#16a085" />
      <LinearGradient
        colors={['#16a085', '#2ecc71', '#27ae60']}
        locations={[0, 0.6, 1]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust offset if needed for headers or safe areas
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }} // Ensures scrolling works properly
          >
            {/* Header Section with Background Pattern */}
            <View className="relative pt-12 pb-6 px-6">
              {/* Decorative Elements */}
              <View className="absolute top-8 right-6 opacity-20">
                <NutritionIcon size={70} color="#ffffff" />
              </View>
              <View className="absolute top-16 left-4 opacity-10">
                <HeartIcon size={50} color="#ffffff" />
              </View>
              <View className="absolute top-28 right-16 opacity-15">
                <ProgressIcon size={45} color="#ffffff" />
              </View>
              <View className="absolute top-6 left-12 opacity-10">
                <FitnessIcon size={40} color="#ffffff" />
              </View>

              {/* Main Logo */}
              <View className="items-center mt-6">
                <View className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                  <UserPlusIcon size={50} color="#16a085" />
                </View>
                <Text className="text-3xl font-bold text-white mb-1 text-center">
                  Join FitLife
                </Text>
                <Text className="text-white/80 text-base text-center mb-2">
                  Start Your Transformation Today
                </Text>
                {/* Progress Bar */}
                <View className="w-20 h-1 bg-white/30 rounded-full overflow-hidden">
                  <View className="w-full h-full bg-white rounded-full" />
                </View>
              </View>
            </View>

            {/* Form Section */}
            <View className="flex-1 px-6 -mt-2">
              <View className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
                <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
                  Create Account
                </Text>

                {error ? (
                  <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                    <Text className="text-red-600 text-center font-medium">{error}</Text>
                  </View>
                ) : null}

                {/* Full Name Input */}
                <View className="mb-4">
                  <Text className="text-gray-700 font-semibold mb-2 ml-1">
                    Full Name
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
                      value={name}
                      onChangeText={setName}
                      placeholder="Enter your full name"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View className="mb-4">
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

                {/* Phone Input */}
                <View className="mb-4">
                  <Text className="text-gray-700 font-semibold mb-2 ml-1">
                    Phone Number
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-800 focus:border-green-500 focus:bg-white"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="phone-pad"
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
                      placeholder="Create a strong password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!isPasswordVisible}
                    />
                  </View>
                </View>

                {/* Terms and Conditions */}
                <View className="mb-6">
                  <Text className="text-xs text-gray-500 text-center leading-4">
                    By signing up, you agree to our{' '}
                    <Text className="text-green-600 font-medium">Terms of Service</Text>
                    {' '}and{' '}
                    <Text className="text-green-600 font-medium">Privacy Policy</Text>
                  </Text>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                  onPress={handleSignUp}
                  activeOpacity={0.8}
                  className="bg-green-600 p-4 rounded-xl items-center mb-4 shadow-lg active:scale-95"
                >
                  <Text className="text-white font-bold text-lg">
                    Create Account
                  </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center mb-4">
                  <View className="flex-1 h-px bg-gray-200" />
                  <Text className="mx-4 text-gray-500 font-medium">OR</Text>
                  <View className="flex-1 h-px bg-gray-200" />
                </View>

                {/* Sign In Link */}
                <TouchableOpacity 
                  onPress={() => navigation.navigate('SignIn')}
                  className="border-2 border-green-500 p-4 rounded-xl items-center"
                >
                  <Text className="text-green-600 font-bold text-lg">
                    Already Have Account? Sign In
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer Features */}
              <View className="flex-row justify-center items-center space-x-8 mb-8">
                <View className="items-center">
                  <NutritionIcon size={28} color="#ffffff" />
                  <Text className="text-white/80 text-xs mt-1">Meal Plans</Text>
                </View>
                <View className="items-center">
                  <HeartIcon size={28} color="#ffffff" />
                  <Text className="text-white/80 text-xs mt-1">Health Track</Text>
                </View>
                <View className="items-center">
                  <ProgressIcon size={28} color="#ffffff" />
                  <Text className="text-white/80 text-xs mt-1">Progress</Text>
                </View>
              </View>

              {/* Welcome Message */}
              <View className="bg-white/10 rounded-2xl p-4 mb-6">
                <Text className="text-white text-center text-sm">
                  🎉 <Text className="font-semibold">Welcome to the FitLife Community!</Text>
                </Text>
                <Text className="text-white/80 text-center text-xs mt-1">
                  Join thousands on their fitness journey
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}
