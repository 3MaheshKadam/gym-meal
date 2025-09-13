import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar, 
  TextInput, 
  SafeAreaView,
  Alert 
} from 'react-native';
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

  // Professional Icons
  const LocationIcon = ({ size = 24, color = "#10b981" }) => (
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

  const ClockIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const BellIcon = ({ size = 24, color = "#6b7280" }) => (
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

  const CalendarIcon = ({ size = 24, color = "#6b7280" }) => (
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

  const PlusIcon = ({ size = 20, color = "#10b981" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const ArrowLeftIcon = ({ size = 24, color = "#6b7280" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const CheckIcon = ({ size = 20, color = "#10b981" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const TruckIcon = ({ size = 24, color = "#6b7280" }) => (
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
      className={`rounded-2xl p-4 mb-3 border-2 ${
        isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'
      }`}
    >
      <View className="flex-row items-start">
        <View className={`p-2 rounded-xl mr-3 ${
          isSelected ? 'bg-emerald-500' : 'bg-gray-100'
        }`}>
          <LocationIcon size={20} color={isSelected ? 'white' : '#6b7280'} />
        </View>
        
        <View className="flex-1">
          <Text className={`font-semibold text-base mb-1 ${
            isSelected ? 'text-emerald-600' : 'text-gray-900'
          }`}>
            {addressData.label}
          </Text>
          <Text className="text-gray-600 text-sm mb-2 leading-5">
            {addressData.address}
          </Text>
          {addressData.instructions && (
            <Text className="text-gray-500 text-xs">
              Instructions: {addressData.instructions}
            </Text>
          )}
        </View>
        
        {isSelected && (
          <View className="bg-emerald-500 rounded-full p-1">
            <CheckIcon size={16} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Time Slot Component
  const TimeSlotCard = ({ slot, isSelected }) => (
    <TouchableOpacity
      onPress={() => setDeliverySettings({
        ...deliverySettings,
        timeSlot: slot.id
      })}
      className={`rounded-2xl p-4 mb-3 border-2 ${
        isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className={`p-2 rounded-xl mr-3 ${
            isSelected ? 'bg-emerald-500' : 'bg-gray-100'
          }`}>
            <ClockIcon size={20} color={isSelected ? 'white' : '#6b7280'} />
          </View>
          <View>
            <Text className={`font-semibold ${
              isSelected ? 'text-emerald-600' : 'text-gray-900'
            }`}>
              {slot.label}
            </Text>
            {slot.popular && (
              <Text className="text-emerald-600 text-xs font-medium">Most Popular</Text>
            )}
          </View>
        </View>
        
        {isSelected && (
          <View className="bg-emerald-500 rounded-full p-1">
            <CheckIcon size={16} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Notification Toggle Component
  const NotificationToggle = ({ title, subtitle, value, onToggle }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <View className="flex-1">
        <Text className="text-gray-900 font-medium">{title}</Text>
        <Text className="text-gray-600 text-sm">{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={onToggle}
        className={`w-12 h-6 rounded-full ${
          value ? 'bg-emerald-500' : 'bg-gray-300'
        }`}
      >
        <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${
          value ? 'ml-6' : 'ml-0.5'
        } transition-all duration-200`} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => navigation?.goBack()}
              className="bg-gray-50 p-2 rounded-xl mr-4"
            >
              <ArrowLeftIcon size={20} color="#6b7280" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900">Delivery Settings</Text>
              <Text className="text-gray-500 text-sm">Customize your meal delivery preferences</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-6 pt-6"
        >
          {/* Delivery Summary Card */}
          <View className="bg-emerald-50 rounded-3xl p-6 mb-6 border border-emerald-100">
            <View className="flex-row items-center mb-4">
              <View className="bg-emerald-500 p-3 rounded-xl mr-4">
                <TruckIcon size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-800 font-bold text-lg">Free Delivery</Text>
                <Text className="text-emerald-600 text-sm">On orders above ₹500</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-emerald-800 font-bold text-lg">30-45</Text>
                <Text className="text-emerald-600 text-xs">Minutes</Text>
              </View>
              <View className="items-center">
                <Text className="text-emerald-800 font-bold text-lg">₹0</Text>
                <Text className="text-emerald-600 text-xs">Delivery Fee</Text>
              </View>
              <View className="items-center">
                <Text className="text-emerald-800 font-bold text-lg">24/7</Text>
                <Text className="text-emerald-600 text-xs">Support</Text>
              </View>
            </View>
          </View>

          {/* Delivery Address */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="bg-gray-50 p-2 rounded-xl mr-3">
                  <LocationIcon size={20} color="#10b981" />
                </View>
                <Text className="text-gray-900 text-lg font-semibold">Delivery Address</Text>
              </View>
              
              <TouchableOpacity
                onPress={() => setShowAddressForm(true)}
                className="bg-emerald-50 p-2 rounded-xl"
              >
                <PlusIcon size={16} color="#10b981" />
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
              <View className="bg-gray-50 rounded-2xl p-4 mt-4">
                <Text className="font-semibold text-gray-900 mb-3">Add New Address</Text>
                
                <TextInput
                  className="bg-white border border-gray-200 rounded-xl p-3 mb-3"
                  placeholder="Address Label (e.g., Home, Office)"
                  value={newAddress.label}
                  onChangeText={(text) => setNewAddress({...newAddress, label: text})}
                />
                
                <TextInput
                  className="bg-white border border-gray-200 rounded-xl p-3 mb-3"
                  placeholder="Full Address"
                  multiline
                  numberOfLines={2}
                  value={newAddress.address}
                  onChangeText={(text) => setNewAddress({...newAddress, address: text})}
                />
                
                <TextInput
                  className="bg-white border border-gray-200 rounded-xl p-3 mb-4"
                  placeholder="Delivery Instructions (optional)"
                  value={newAddress.instructions}
                  onChangeText={(text) => setNewAddress({...newAddress, instructions: text})}
                />
                
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => setShowAddressForm(false)}
                    className="flex-1 bg-gray-200 rounded-xl p-3 mr-2"
                  >
                    <Text className="text-center text-gray-700 font-medium">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAddAddress}
                    className="flex-1 bg-emerald-500 rounded-xl p-3 ml-2"
                  >
                    <Text className="text-center text-white font-medium">Add Address</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Delivery Time */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
            <View className="flex-row items-center mb-4">
              <View className="bg-gray-50 p-2 rounded-xl mr-3">
                <ClockIcon size={20} color="#6b7280" />
              </View>
              <Text className="text-gray-900 text-lg font-semibold">Delivery Time</Text>
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
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
            <View className="flex-row items-center mb-4">
              <View className="bg-gray-50 p-2 rounded-xl mr-3">
                <CalendarIcon size={20} color="#6b7280" />
              </View>
              <Text className="text-gray-900 text-lg font-semibold">Schedule Delivery</Text>
            </View>

            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#10b981' },
                ...Object.keys(deliverySchedule).reduce((acc, date) => ({
                  ...acc,
                  [date]: { marked: true, dotColor: '#10b981' }
                }), {})
              }}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: '#6b7280',
                selectedDayBackgroundColor: '#10b981',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#10b981',
                dayTextColor: '#1f2937',
                textDisabledColor: '#d1d5db',
                arrowColor: '#10b981',
                monthTextColor: '#1f2937',
                textDayFontWeight: '500',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '500'
              }}
              minDate={new Date().toISOString().split('T')[0]}
            />

            {selectedDate && (
              <View className="bg-emerald-50 rounded-2xl p-4 mt-4">
                <Text className="text-emerald-800 font-semibold mb-2">
                  Delivery for {new Date(selectedDate).toLocaleDateString()}
                </Text>
                <Text className="text-emerald-600 text-sm">
                  Your meals will be delivered to {addresses[selectedAddress]?.label} between {
                    timeSlots.find(slot => slot.id === deliverySettings.timeSlot)?.label
                  }
                </Text>
              </View>
            )}
          </View>

          {/* Notifications */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
            <View className="flex-row items-center mb-4">
              <View className="bg-gray-50 p-2 rounded-xl mr-3">
                <BellIcon size={20} color="#6b7280" />
              </View>
              <Text className="text-gray-900 text-lg font-semibold">Notification Preferences</Text>
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
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-50">
            <Text className="text-gray-900 text-lg font-semibold mb-4">Special Instructions</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
              placeholder="Any special delivery instructions? (e.g., Ring doorbell, Call on arrival, Leave at door)"
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
            className="bg-emerald-500 rounded-2xl p-5 items-center mb-8 shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">Save Delivery Preferences</Text>
            <Text className="text-emerald-100 text-sm mt-1">
              Continue to payment and complete your order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;