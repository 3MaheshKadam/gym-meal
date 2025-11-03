import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar, 
  TextInput, 
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import Svg, { Path, Circle } from 'react-native-svg';

const DeliveryScreen = ({ navigation }) => {
  // State management
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [addresses, setAddresses] = useState({
    home: {
      label: 'Home',
      address: '123 Fitness Lane, Bandra, Mumbai 400050',
      instructions: 'Ring the bell twice'
    },
    office: {
      label: 'Office',
      address: '456 Corporate Park, Andheri, Mumbai 400053',
      instructions: 'Leave with security'
    },
    gym: {
      label: 'Gym',
      address: '789 Fitness Center, Powai, Mumbai 400076',
      instructions: 'Call when arrived'
    }
  });
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [deliverySchedule, setDeliverySchedule] = useState({});
  const [deliverySettings, setDeliverySettings] = useState({
    timeSlot: '12:00-14:00',
    notifications: {
      beforeDelivery: true,
      onDelivery: true,
      orderUpdates: true
    },
    specialInstructions: ''
  });
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    instructions: ''
  });

  // Time slots for delivery
  const timeSlots = [
    { id: '08:00-10:00', label: '8:00 AM - 10:00 AM', popular: false },
    { id: '12:00-14:00', label: '12:00 PM - 2:00 PM', popular: true },
    { id: '18:00-20:00', label: '6:00 PM - 8:00 PM', popular: true },
    { id: '20:00-22:00', label: '8:00 PM - 10:00 PM', popular: false }
  ];

  // Enhanced Icons
  const LocationIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
    </Svg>
  );

  const ClockIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const BellIcon = ({ size = 24, color = "#ff6b35" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const PlusIcon = ({ size = 20, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const ArrowLeftIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const CheckIcon = ({ size = 20, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const TruckIcon = ({ size = 24, color = "#ffffff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 3H15V13H1V3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 8H20L23 11V16H16V8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth="2" />
      <Circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth="2" />
    </Svg>
  );

  const LightningIcon = ({ size = 24, color = "#ffd93d" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill={color} />
    </Svg>
  );

  // Handle day press for calendar
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // Add new address
  const handleAddAddress = () => {
    if (!newAddress.label.trim() || !newAddress.address.trim()) {
      Alert.alert('Error', 'Please fill in the address label and address fields');
      return;
    }
    
    const addressKey = newAddress.label.toLowerCase().replace(' ', '_');
    setAddresses({
      ...addresses,
      [addressKey]: newAddress
    });
    
    setNewAddress({ label: '', address: '', instructions: '' });
    setShowAddressForm(false);
    Alert.alert('Success', 'Address added successfully!');
  };

  // Save preferences
  const handleSave = () => {
    Alert.alert(
      'Preferences Saved',
      'Your delivery preferences have been saved successfully.',
      [
        {
          text: 'Continue to Payment',
          onPress: () => navigation?.navigate('Payment')
        }
      ]
    );
  };

  // Address Card Component
  const AddressCard = ({ addressKey, addressData, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedAddress(addressKey)}
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
            <View className="flex-row items-start">
              <LinearGradient
                colors={['#ff6b35', '#f7931e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 10, borderRadius: 12, marginRight: 12 }}
              >
                <LocationIcon size={20} color="white" />
              </LinearGradient>
              
              <View className="flex-1">
                <Text className="font-black text-white text-base mb-1">
                  {addressData.label}
                </Text>
                <Text className="text-gray-300 text-sm mb-2 leading-5 font-semibold">
                  {addressData.address}
                </Text>
                {addressData.instructions && (
                  <Text className="text-gray-400 text-xs">
                    Instructions: {addressData.instructions}
                  </Text>
                )}
              </View>
              
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
              >
                <CheckIcon size={14} color="white" />
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View className="bg-white/10 border-2 border-white/20 rounded-2xl p-4">
          <View className="flex-row items-start">
            <View className="bg-white/5 p-2 rounded-xl mr-3">
              <LocationIcon size={20} color="#9ca3af" />
            </View>
            
            <View className="flex-1">
              <Text className="font-bold text-white text-base mb-1">
                {addressData.label}
              </Text>
              <Text className="text-gray-400 text-sm mb-2 leading-5">
                {addressData.address}
              </Text>
              {addressData.instructions && (
                <Text className="text-gray-500 text-xs">
                  Instructions: {addressData.instructions}
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  // Time Slot Component
  const TimeSlotCard = ({ slot, isSelected }) => (
    <TouchableOpacity
      onPress={() => setDeliverySettings({
        ...deliverySettings,
        timeSlot: slot.id
      })}
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
              <View className="flex-row items-center flex-1">
                <LinearGradient
                  colors={['#ff6b35', '#f7931e']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ padding: 10, borderRadius: 12, marginRight: 12 }}
                >
                  <ClockIcon size={20} color="white" />
                </LinearGradient>
                <View className="flex-1">
                  <Text className="font-black text-white">
                    {slot.label}
                  </Text>
                  {slot.popular && (
                    <Text className="text-orange-400 text-xs font-bold">⚡ Most Popular</Text>
                  )}
                </View>
              </View>
              
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
              >
                <CheckIcon size={14} color="white" />
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View className="bg-white/10 border-2 border-white/20 rounded-2xl p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-white/5 p-2 rounded-xl mr-3">
                <ClockIcon size={20} color="#9ca3af" />
              </View>
              <View>
                <Text className="font-bold text-white">
                  {slot.label}
                </Text>
                {slot.popular && (
                  <Text className="text-orange-400 text-xs font-semibold">⚡ Most Popular</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  // Notification Toggle Component
  const NotificationToggle = ({ title, subtitle, value, onToggle }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-white/10 last:border-b-0">
      <View className="flex-1">
        <Text className="text-white font-bold">{title}</Text>
        <Text className="text-gray-400 text-sm">{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={value ? ['#10b981', '#059669'] : ['#374151', '#4b5563']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 48,
            height: 28,
            borderRadius: 14,
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: 'white',
              alignSelf: value ? 'flex-end' : 'flex-start',
            }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
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
              onPress={() => navigation?.goBack()}
              className="bg-white/10 border border-white/20 p-3 rounded-xl mr-4"
              activeOpacity={0.7}
            >
              <ArrowLeftIcon size={20} color="#ffffff" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-2xl font-black text-white tracking-tight">DELIVERY</Text>
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
          {/* Delivery Summary Card */}
          <View className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/30 rounded-3xl p-6 mb-5">
            <View className="flex-row items-center mb-4">
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 12, borderRadius: 16, marginRight: 16 }}
              >
                <TruckIcon size={24} color="white" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-white font-black text-lg tracking-wide">FREE DELIVERY</Text>
                <Text className="text-green-300 text-sm font-semibold">On orders above ₹500</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-white font-black text-lg">30-45</Text>
                <Text className="text-green-300 text-xs font-semibold">Minutes</Text>
              </View>
              <View className="items-center">
                <Text className="text-white font-black text-lg">₹0</Text>
                <Text className="text-green-300 text-xs font-semibold">Delivery Fee</Text>
              </View>
              <View className="items-center">
                <Text className="text-white font-black text-lg">24/7</Text>
                <Text className="text-green-300 text-xs font-semibold">Support</Text>
              </View>
            </View>
          </View>

          {/* Delivery Address */}
          <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mr-3 items-center justify-center">
                  <LocationIcon size={20} color="#ffffff" />
                </View>
                <Text className="text-white text-lg font-black tracking-wide">ADDRESS</Text>
              </View>
              
              <TouchableOpacity
                onPress={() => setShowAddressForm(true)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ padding: 8, borderRadius: 12 }}
                >
                  <PlusIcon size={16} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {Object.entries(addresses).map(([key, address]) => (
              <AddressCard
                key={key}
                addressKey={key}
                addressData={address}
                isSelected={selectedAddress === key}
              />
            ))}

            {/* Add New Address Form */}
            {showAddressForm && (
              <View className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4">
                <Text className="font-black text-white mb-3 tracking-wide">ADD NEW ADDRESS</Text>
                
                <TextInput
                  className="bg-white/10 border border-white/20 rounded-xl p-3 mb-3 text-white"
                  placeholder="Address Label (e.g., Home, Office)"
                  placeholderTextColor="#6b7280"
                  value={newAddress.label}
                  onChangeText={(text) => setNewAddress({...newAddress, label: text})}
                />
                
                <TextInput
                  className="bg-white/10 border border-white/20 rounded-xl p-3 mb-3 text-white"
                  placeholder="Full Address"
                  placeholderTextColor="#6b7280"
                  multiline
                  numberOfLines={2}
                  value={newAddress.address}
                  onChangeText={(text) => setNewAddress({...newAddress, address: text})}
                />
                
                <TextInput
                  className="bg-white/10 border border-white/20 rounded-xl p-3 mb-4 text-white"
                  placeholder="Delivery Instructions (optional)"
                  placeholderTextColor="#6b7280"
                  value={newAddress.instructions}
                  onChangeText={(text) => setNewAddress({...newAddress, instructions: text})}
                />
                
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => setShowAddressForm(false)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl p-3 mr-2"
                    activeOpacity={0.7}
                  >
                    <Text className="text-center text-white font-bold">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAddAddress}
                    activeOpacity={0.8}
                    className="flex-1 ml-2 overflow-hidden rounded-xl"
                  >
                    <LinearGradient
                      colors={['#10b981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ padding: 12 }}
                    >
                      <Text className="text-center text-white font-bold">Add</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Delivery Time */}
          <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mr-3 items-center justify-center">
                <ClockIcon size={20} color="#ffffff" />
              </View>
              <Text className="text-white text-lg font-black tracking-wide">TIME SLOT</Text>
            </View>

            {timeSlots.map((slot) => (
              <TimeSlotCard
                key={slot.id}
                slot={slot}
                isSelected={deliverySettings.timeSlot === slot.id}
              />
            ))}
          </View>

          {/* Delivery Calendar */}
          <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mr-3 items-center justify-center">
                <CalendarIcon size={20} color="#ffffff" />
              </View>
              <Text className="text-white text-lg font-black tracking-wide">SCHEDULE</Text>
            </View>

            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#ff6b35' },
                ...Object.keys(deliverySchedule).reduce((acc, date) => ({
                  ...acc,
                  [date]: { marked: true, dotColor: '#ff6b35' }
                }), {})
              }}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: '#9ca3af',
                selectedDayBackgroundColor: '#ff6b35',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#ff6b35',
                dayTextColor: '#ffffff',
                textDisabledColor: '#4b5563',
                arrowColor: '#ff6b35',
                monthTextColor: '#ffffff',
                textDayFontWeight: '600',
                textMonthFontWeight: '800',
                textDayHeaderFontWeight: '600'
              }}
              minDate={new Date().toISOString().split('T')[0]}
            />

            {selectedDate && (
              <View className="bg-gradient-to-br from-orange-500/20 to-pink-600/20 border border-orange-500/30 rounded-2xl p-4 mt-4">
                <Text className="text-white font-black mb-2 tracking-wide">
                  DELIVERY FOR {new Date(selectedDate).toLocaleDateString().toUpperCase()}
                </Text>
                <Text className="text-gray-300 text-sm font-semibold">
                  Your meals will be delivered to {addresses[selectedAddress]?.label} between {
                    timeSlots.find(slot => slot.id === deliverySettings.timeSlot)?.label
                  }
                </Text>
              </View>
            )}
          </View>

          {/* Notifications */}
          <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mr-3 items-center justify-center">
                <BellIcon size={20} color="#ffffff" />
              </View>
              <Text className="text-white text-lg font-black tracking-wide">NOTIFICATIONS</Text>
            </View>

            <NotificationToggle
              title="Delivery Notifications"
              subtitle="Get notified 30 minutes before delivery"
              value={deliverySettings.notifications.beforeDelivery}
              onToggle={() => setDeliverySettings({
                ...deliverySettings,
                notifications: {
                  ...deliverySettings.notifications,
                  beforeDelivery: !deliverySettings.notifications.beforeDelivery
                }
              })}
            />

            <NotificationToggle
              title="Arrival Notifications"
              subtitle="Get notified when delivery partner arrives"
              value={deliverySettings.notifications.onDelivery}
              onToggle={() => setDeliverySettings({
                ...deliverySettings,
                notifications: {
                  ...deliverySettings.notifications,
                  onDelivery: !deliverySettings.notifications.onDelivery
                }
              })}
            />

            <NotificationToggle
              title="Order Updates"
              subtitle="Get updates about order preparation and dispatch"
              value={deliverySettings.notifications.orderUpdates}
              onToggle={() => setDeliverySettings({
                ...deliverySettings,
                notifications: {
                  ...deliverySettings.notifications,
                  orderUpdates: !deliverySettings.notifications.orderUpdates
                }
              })}
            />
          </View>

          {/* Special Instructions */}
          <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-5 border border-white/20">
            <Text className="text-white text-lg font-black mb-4 tracking-wide">SPECIAL INSTRUCTIONS</Text>
            <TextInput
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
              placeholder="Any special delivery instructions? (e.g., Ring doorbell, Call on arrival)"
              placeholderTextColor="#6b7280"
              multiline
              numberOfLines={3}
              value={deliverySettings.specialInstructions}
              onChangeText={(text) => setDeliverySettings({
                ...deliverySettings,
                specialInstructions: text
              })}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            className="mb-8 overflow-hidden rounded-2xl"
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
                SAVE PREFERENCES →
              </Text>
              <Text className="text-white/80 text-sm mt-1 font-bold">
                Continue to payment and complete your order
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DeliveryScreen;