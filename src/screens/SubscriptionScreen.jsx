import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle, Check } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Professional Icons
const CheckIcon = ({ size = 20, color = "#10b981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path
      d="M9 12L11 14L15 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon = ({ size = 16, color = "#fbbf24" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={color}
    />
  </Svg>
);

const CrownIcon = ({ size = 24, color = "#fbbf24" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowLeftIcon = ({ size = 24, color = "#6b7280" }) => (
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

const LockIcon = ({ size = 20, color = "#6b7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SubscriptionScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const subscriptionPlans = {
    basic: {
      name: 'Basic',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      description: 'Perfect for getting started',
      features: [
        '3 meals per day',
        'Basic nutrition tracking',
        'Standard meal recommendations',
        'Email support',
        'Mobile app access'
      ],
      color: 'gray',
      popular: false
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      description: 'Most popular for serious fitness',
      features: [
        'Unlimited meal plans',
        'Advanced nutrition analytics',
        'Personalized recommendations',
        'Priority support',
        'Workout integration',
        'Macro tracking',
        'Shopping lists'
      ],
      color: 'emerald',
      popular: true
    },
    premium: {
      name: 'Premium',
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      description: 'Complete nutrition solution',
      features: [
        'Everything in Pro',
        'Personal nutrition coach',
        '1-on-1 consultations',
        'Custom meal delivery',
        'Lab result analysis',
        'Supplement recommendations',
        'VIP support'
      ],
      color: 'amber',
      popular: false
    }
  };

  const calculateYearlySavings = (plan) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings: savings.toFixed(2), percentage };
  };

  const PlanCard = ({ planKey, plan }) => {
    const isSelected = selectedPlan === planKey;
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12;
    const savings = calculateYearlySavings(plan);

    return (
      <TouchableOpacity
        onPress={() => setSelectedPlan(planKey)}
        className={`rounded-3xl p-6 mb-4 border-2 ${
          isSelected 
            ? plan.color === 'emerald' 
              ? 'border-emerald-500 bg-emerald-50' 
              : plan.color === 'amber'
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-500 bg-gray-50'
            : 'border-gray-200 bg-white'
        }`}
      >
        {plan.popular && (
          <View className="absolute -top-3 left-6 right-6 items-center">
            <View className="bg-emerald-500 px-4 py-2 rounded-full flex-row items-center">
              <StarIcon size={14} color="white" />
              <Text className="text-white font-semibold text-xs ml-1">MOST POPULAR</Text>
            </View>
          </View>
        )}

        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Text className={`text-xl font-bold ${
                isSelected 
                  ? plan.color === 'emerald' 
                    ? 'text-emerald-600' 
                    : plan.color === 'amber'
                      ? 'text-amber-600'
                      : 'text-gray-600'
                  : 'text-gray-900'
              }`}>
                {plan.name}
              </Text>
              {plan.name === 'Premium' && (
                <View className="ml-2">
                  <CrownIcon size={20} color="#fbbf24" />
                </View>
              )}
            </View>
            <Text className="text-gray-600 text-sm">{plan.description}</Text>
          </View>

          <View className="items-end">
            <View className="flex-row items-baseline">
              <Text className={`text-2xl font-bold ${
                isSelected 
                  ? plan.color === 'emerald' 
                    ? 'text-emerald-600' 
                    : plan.color === 'amber'
                      ? 'text-amber-600'
                      : 'text-gray-600'
                  : 'text-gray-900'
              }`}>
                ${price.toFixed(2)}
              </Text>
              <Text className="text-gray-500 text-sm">/mo</Text>
            </View>
            {billingCycle === 'yearly' && (
              <View className="bg-green-100 px-2 py-1 rounded-full mt-1">
                <Text className="text-green-700 text-xs font-medium">
                  Save {savings.percentage}%
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="space-y-3">
          {plan.features.map((feature, index) => (
            <View key={index} className="flex-row items-center">
              <CheckIcon size={16} color={
                isSelected 
                  ? plan.color === 'emerald' 
                    ? '#10b981' 
                    : plan.color === 'amber'
                      ? '#f59e0b'
                      : '#6b7280'
                  : '#10b981'
              } />
              <Text className="text-gray-700 text-sm ml-3 flex-1">{feature}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const BillingToggle = () => (
    <View className="bg-white rounded-2xl p-2 mb-6 flex-row shadow-sm border border-gray-100">
      <TouchableOpacity
        onPress={() => setBillingCycle('monthly')}
        className={`flex-1 py-3 rounded-xl items-center ${
          billingCycle === 'monthly' ? 'bg-emerald-500' : 'bg-transparent'
        }`}
      >
        <Text className={`font-medium ${
          billingCycle === 'monthly' ? 'text-white' : 'text-gray-600'
        }`}>
          Monthly
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => setBillingCycle('yearly')}
        className={`flex-1 py-3 rounded-xl items-center ${
          billingCycle === 'yearly' ? 'bg-emerald-500' : 'bg-transparent'
        }`}
      >
        <View className="items-center">
          <Text className={`font-medium ${
            billingCycle === 'yearly' ? 'text-white' : 'text-gray-600'
          }`}>
            Yearly
          </Text>
          <Text className={`text-xs ${
            billingCycle === 'yearly' ? 'text-emerald-100' : 'text-emerald-600'
          }`}>
            Save up to 20%
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const FeatureComparison = () => (
    <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-900 mb-4">Why choose Pro?</Text>
      
      <View className="space-y-4">
        <View className="flex-row items-start">
          <CheckIcon size={20} color="#10b981" />
          <View className="ml-3 flex-1">
            <Text className="font-medium text-gray-900 mb-1">Unlimited Meal Plans</Text>
            <Text className="text-gray-600 text-sm">Create and save unlimited personalized meal plans for any goal</Text>
          </View>
        </View>
        
        <View className="flex-row items-start">
          <CheckIcon size={20} color="#10b981" />
          <View className="ml-3 flex-1">
            <Text className="font-medium text-gray-900 mb-1">Advanced Analytics</Text>
            <Text className="text-gray-600 text-sm">Detailed nutrition insights and progress tracking</Text>
          </View>
        </View>
        
        <View className="flex-row items-start">
          <CheckIcon size={20} color="#10b981" />
          <View className="ml-3 flex-1">
            <Text className="font-medium text-gray-900 mb-1">Workout Integration</Text>
            <Text className="text-gray-600 text-sm">Sync with fitness apps and adjust nutrition based on workouts</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const SecurityBadge = () => (
    <View className="flex-row items-center justify-center mb-6">
      <LockIcon size={16} color="#6b7280" />
      <Text className="text-gray-600 text-sm ml-2">Secure payment • Cancel anytime • 30-day guarantee</Text>
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
              <Text className="text-2xl font-bold text-gray-900">Choose Your Plan</Text>
              <Text className="text-gray-500 text-sm">Unlock your full nutrition potential</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-6"
        >
          {/* Hero Section */}
          <View className="py-6">
            <Text className="text-3xl font-bold text-center text-gray-900 mb-3">
              Start Your Transformation
            </Text>
            <Text className="text-center text-gray-600 text-base leading-6">
              Join thousands of users who've achieved their fitness goals with personalized nutrition plans
            </Text>
          </View>

          <BillingToggle />

          {/* Subscription Plans */}
          <View className="mb-6">
            {Object.entries(subscriptionPlans).map(([key, plan]) => (
              <PlanCard key={key} planKey={key} plan={plan} />
            ))}
          </View>

          <FeatureComparison />

          {/* Testimonial */}
          <View className="bg-emerald-50 rounded-3xl p-6 mb-6 border border-emerald-100">
            <View className="flex-row items-center mb-3">
              {[1,2,3,4,5].map(i => (
                <StarIcon key={i} size={16} color="#fbbf24" />
              ))}
              <Text className="text-emerald-700 font-medium ml-2">4.9/5</Text>
            </View>
            <Text className="text-gray-700 text-base mb-3 italic">
              "GymMeal transformed my nutrition game. The personalized plans and tracking made reaching my fitness goals so much easier!"
            </Text>
            <Text className="text-emerald-700 font-medium">- Sarah M., Pro Member</Text>
          </View>

          <SecurityBadge />

          {/* Subscribe Button */}
          <TouchableOpacity 
            className="bg-emerald-500 rounded-2xl p-5 items-center mb-4 shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">
              Start {subscriptionPlans[selectedPlan].name} Plan
            </Text>
            <Text className="text-emerald-100 text-sm mt-1">
              {billingCycle === 'monthly' 
                ? `$${subscriptionPlans[selectedPlan].monthlyPrice}/month`
                : `$${subscriptionPlans[selectedPlan].yearlyPrice}/year`
              }
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text className="text-center text-gray-500 text-xs mb-8 leading-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy. 
            Subscription auto-renews unless cancelled 24 hours before renewal.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SubscriptionScreen;