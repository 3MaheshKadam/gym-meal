import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const PaymentScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  // Icons
  const CreditCardIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="1" y="4" width="22" height="16" rx="2" stroke={color} strokeWidth="2"/>
      <Path d="M1 10H23" stroke={color} strokeWidth="2"/>
    </Svg>
  );

  const WalletIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 8V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12H17C15.8954 12 15 12.8954 15 14C15 15.1046 15.8954 16 17 16H21V12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const UpiIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path d="M12 8V16M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </Svg>
  );

  const LockIcon = ({ size = 20, color = "#10b981" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
        stroke={color}
        strokeWidth="2"
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

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCardIcon size={20} color="#ffffff" /> },
    { id: 'upi', name: 'UPI', icon: <UpiIcon size={20} color="#ffffff" /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <WalletIcon size={20} color="#ffffff" /> },
  ];

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handlePayment = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        Alert.alert('Error', 'Please fill all card details');
        return;
      }
    }

    Alert.alert(
      'Payment Successful! 🎉',
      'Your subscription has been activated.',
      [
        {
          text: 'Go to Dashboard',
          onPress: () => navigation.navigate('Tab')
        }
      ]
    );
  };

  const PaymentMethodCard = ({ method, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedMethod(method.id)}
      activeOpacity={0.8}
      className="mb-3"
    >
      {isSelected ? (
        <LinearGradient
          colors={['#ff6b35', '#f7931e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 2, borderRadius: 16 }}
        >
          <View className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <LinearGradient
                  colors={['#ff6b35', '#f7931e']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ padding: 10, borderRadius: 12, marginRight: 12 }}
                >
                  {method.icon}
                </LinearGradient>
                <Text className="text-white font-black text-base">{method.name}</Text>
              </View>
              <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-xs">✓</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View className="bg-white/10 border-2 border-white/20 rounded-2xl p-4">
          <View className="flex-row items-center">
            <View className="bg-white/5 p-2 rounded-xl mr-3">
              {method.icon}
            </View>
            <Text className="text-white font-bold text-base">{method.name}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
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
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white/10 border border-white/20 p-3 rounded-xl mr-4"
              activeOpacity={0.7}
            >
              <ArrowLeftIcon size={20} color="#ffffff" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-2xl font-black text-white tracking-tight">PAYMENT</Text>
              <View className="flex-row items-center mt-1">
                <View className="w-6 h-1 bg-orange-500 rounded-full mr-1" />
                <LightningIcon size={10} color="#ffd93d" />
                <View className="w-6 h-1 bg-orange-500 rounded-full ml-1" />
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 80 }}
        >
          {/* Order Summary */}
          <View className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/30 rounded-3xl p-5 mb-5">
            <Text className="text-white font-black text-lg mb-4 tracking-wide">ORDER SUMMARY</Text>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-300 font-semibold">Pro Plan (Monthly)</Text>
              <Text className="text-white font-black text-lg">₹1,999</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-300 font-semibold">GST (18%)</Text>
              <Text className="text-white font-bold">₹360</Text>
            </View>
            <View className="h-px bg-white/20 my-3" />
            <View className="flex-row justify-between items-center">
              <Text className="text-white font-black text-lg">Total Amount</Text>
              <Text className="text-orange-400 font-black text-2xl">₹2,359</Text>
            </View>
          </View>

          {/* Payment Methods */}
          <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
            <Text className="text-white font-black text-lg mb-4 tracking-wide">PAYMENT METHOD</Text>
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                isSelected={selectedMethod === method.id}
              />
            ))}
          </View>

          {/* Card Details Form */}
          {selectedMethod === 'card' && (
            <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
              <Text className="text-white font-black text-lg mb-4 tracking-wide">CARD DETAILS</Text>
              
              <View className="mb-4">
                <Text className="text-gray-300 font-bold mb-2 text-xs tracking-wide">CARD NUMBER</Text>
                <TextInput
                  className="bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white font-semibold"
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#6b7280"
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  keyboardType="number-pad"
                  maxLength={19}
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-300 font-bold mb-2 text-xs tracking-wide">CARDHOLDER NAME</Text>
                <TextInput
                  className="bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white font-semibold"
                  placeholder="John Doe"
                  placeholderTextColor="#6b7280"
                  value={cardName}
                  onChangeText={setCardName}
                  autoCapitalize="characters"
                />
              </View>

              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-300 font-bold mb-2 text-xs tracking-wide">EXPIRY DATE</Text>
                  <TextInput
                    className="bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white font-semibold"
                    placeholder="MM/YY"
                    placeholderTextColor="#6b7280"
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-gray-300 font-bold mb-2 text-xs tracking-wide">CVV</Text>
                  <TextInput
                    className="bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white font-semibold"
                    placeholder="123"
                    placeholderTextColor="#6b7280"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setSaveCard(!saveCard)}
                className="flex-row items-center"
                activeOpacity={0.7}
              >
                <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${saveCard ? 'bg-orange-500 border-orange-500' : 'border-white/40'}`}>
                  {saveCard && <Text className="text-white font-bold text-xs">✓</Text>}
                </View>
                <Text className="text-gray-300 font-semibold">Save card for future payments</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* UPI Form */}
          {selectedMethod === 'upi' && (
            <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
              <Text className="text-white font-black text-lg mb-4 tracking-wide">UPI DETAILS</Text>
              <Text className="text-gray-300 font-bold mb-2 text-xs tracking-wide">UPI ID</Text>
              <TextInput
                className="bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white font-semibold"
                placeholder="yourname@upi"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Security Badge */}
          <View className="flex-row items-center justify-center mb-5">
            <LockIcon size={16} color="#10b981" />
            <Text className="text-gray-400 text-xs ml-2">
              Secure payment • 256-bit encryption • PCI DSS compliant
            </Text>
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            onPress={handlePayment}
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
                PAY ₹2,359 →
              </Text>
              <Text className="text-white/80 text-sm mt-1 font-bold">
                Complete your subscription
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PaymentScreen;