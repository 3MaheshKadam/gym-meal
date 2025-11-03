import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Enhanced Icons
const CheckIcon = ({ size = 20, color = "#10b981" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path
      d="M9 12L11 14L15 10"
      stroke="white"
      strokeWidth="2.5"
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
      fill="none"
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

const LockIcon = ({ size = 20, color = "#9ca3af" }) => (
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

const FireIcon = ({ size = 24, color = "#ff6b35" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"
      fill={color}
    />
  </Svg>
);

const LightningIcon = ({ size = 24, color = "#ffd93d" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill={color} />
  </Svg>
);

const SubscriptionScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

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
      gradient: ['#6b7280', '#9ca3af'],
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
      gradient: ['#ff6b35', '#f7931e'],
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
      gradient: ['#fbbf24', '#f59e0b'],
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
        activeOpacity={0.8}
        className="mb-4"
      >
        <View className={`rounded-3xl overflow-hidden ${isSelected ? 'shadow-2xl' : ''}`}>
          {isSelected ? (
            <LinearGradient
              colors={plan.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 3, borderRadius: 24 }}
            >
              <View className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6">
                {plan.popular && (
                  <View className="absolute -top-1 right-6 z-10">
                    <LinearGradient
                      colors={['#10b981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <StarIcon size={12} color="white" />
                      <Text className="text-white font-black text-xs ml-1 tracking-wide">POPULAR</Text>
                    </LinearGradient>
                  </View>
                )}

                <View className="flex-row justify-between items-start mb-5">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-2xl font-black text-white">
                        {plan.name}
                      </Text>
                      {plan.name === 'Premium' && (
                        <View className="ml-2">
                          <CrownIcon size={22} color="#fbbf24" />
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-300 text-sm font-semibold">{plan.description}</Text>
                  </View>

                  <View className="items-end">
                    <View className="flex-row items-baseline">
                      <Text className="text-3xl font-black text-white">
                        ${price.toFixed(2)}
                      </Text>
                      <Text className="text-gray-400 text-sm font-bold">/mo</Text>
                    </View>
                    {billingCycle === 'yearly' && (
                      <View className="bg-green-500/20 border border-green-500/40 px-2 py-1 rounded-full mt-1">
                        <Text className="text-green-300 text-xs font-black">
                          Save {savings.percentage}%
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <View key={index} className="flex-row items-center mb-3">
                      <LinearGradient
                        colors={plan.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Text className="text-white font-bold text-xs">✓</Text>
                      </LinearGradient>
                      <Text className="text-gray-200 text-sm ml-3 flex-1 font-semibold">{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          ) : (
            <View className="bg-white/10 border-2 border-white/20 rounded-3xl p-6">
              {plan.popular && (
                <View className="absolute -top-2 right-6">
                  <View className="bg-green-500/20 border border-green-500/40 px-3 py-1.5 rounded-full flex-row items-center">
                    <StarIcon size={12} color="#10b981" />
                    <Text className="text-green-400 font-bold text-xs ml-1">POPULAR</Text>
                  </View>
                </View>
              )}

              <View className="flex-row justify-between items-start mb-5">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Text className="text-xl font-bold text-white">
                      {plan.name}
                    </Text>
                    {plan.name === 'Premium' && (
                      <View className="ml-2">
                        <CrownIcon size={20} color="#6b7280" />
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-400 text-sm">{plan.description}</Text>
                </View>

                <View className="items-end">
                  <View className="flex-row items-baseline">
                    <Text className="text-2xl font-bold text-white">
                      ${price.toFixed(2)}
                    </Text>
                    <Text className="text-gray-500 text-sm">/mo</Text>
                  </View>
                  {billingCycle === 'yearly' && (
                    <View className="bg-green-500/10 px-2 py-1 rounded-full mt-1">
                      <Text className="text-green-400 text-xs font-semibold">
                        Save {savings.percentage}%
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View className="space-y-3">
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <CheckIcon size={16} color="#6b7280" />
                    <Text className="text-gray-300 text-sm ml-3 flex-1">{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const BillingToggle = () => (
    <View className="bg-white/10 border border-white/20 rounded-2xl p-1.5 mb-6 flex-row">
      <TouchableOpacity
        onPress={() => setBillingCycle('monthly')}
        className="flex-1"
        activeOpacity={0.8}
      >
        {billingCycle === 'monthly' ? (
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: 'center',
            }}
          >
            <Text className="font-black text-white tracking-wide">
              MONTHLY
            </Text>
          </LinearGradient>
        ) : (
          <View className="py-3 items-center">
            <Text className="font-semibold text-gray-400">Monthly</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => setBillingCycle('yearly')}
        className="flex-1"
        activeOpacity={0.8}
      >
        {billingCycle === 'yearly' ? (
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: 'center',
            }}
          >
            <Text className="font-black text-white tracking-wide">
              YEARLY
            </Text>
            <Text className="text-white/80 text-xs font-bold mt-0.5">
              Save up to 20%
            </Text>
          </LinearGradient>
        ) : (
          <View className="py-3 items-center">
            <Text className="font-semibold text-gray-400">Yearly</Text>
            <Text className="text-orange-400 text-xs font-semibold mt-0.5">
              Save up to 20%
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const FeatureComparison = () => (
    <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20">
      <View className="flex-row items-center mb-5">
        <View className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mr-3 items-center justify-center">
          <FireIcon size={20} color="#ffffff" />
        </View>
        <Text className="text-white text-lg font-black tracking-wide">WHY CHOOSE PRO?</Text>
      </View>
      
      <View className="space-y-4">
        <View className="flex-row items-start mb-4">
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 2 }}
          >
            <Text className="text-white font-bold">✓</Text>
          </LinearGradient>
          <View className="ml-3 flex-1">
            <Text className="font-bold text-white mb-1">Unlimited Meal Plans</Text>
            <Text className="text-gray-300 text-sm">Create and save unlimited personalized meal plans for any goal</Text>
          </View>
        </View>
        
        <View className="flex-row items-start mb-4">
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 2 }}
          >
            <Text className="text-white font-bold">✓</Text>
          </LinearGradient>
          <View className="ml-3 flex-1">
            <Text className="font-bold text-white mb-1">Advanced Analytics</Text>
            <Text className="text-gray-300 text-sm">Detailed nutrition insights and progress tracking</Text>
          </View>
        </View>
        
        <View className="flex-row items-start">
          <LinearGradient
            colors={['#ff6b35', '#f7931e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 2 }}
          >
            <Text className="text-white font-bold">✓</Text>
          </LinearGradient>
          <View className="ml-3 flex-1">
            <Text className="font-bold text-white mb-1">Workout Integration</Text>
            <Text className="text-gray-300 text-sm">Sync with fitness apps and adjust nutrition based on workouts</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const SecurityBadge = () => (
    <View className="flex-row items-center justify-center mb-6 flex-wrap px-4">
      <LockIcon size={16} color="#9ca3af" />
      <Text className="text-gray-400 text-xs ml-2 text-center">
        Secure payment • Cancel anytime • 30-day guarantee
      </Text>
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
              <Text className="text-2xl font-black text-white tracking-tight">CHOOSE PLAN</Text>
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
          {/* Hero Section */}
          <View className="py-6">
            <Text className="text-3xl font-black text-center text-white mb-3 tracking-tight">
              START YOUR{'\n'}TRANSFORMATION 🔥
            </Text>
            <Text className="text-center text-gray-300 text-base leading-6 font-semibold">
              Join thousands who&apos;ve achieved their fitness goals with personalized nutrition
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
          <View className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/30 rounded-3xl p-6 mb-6">
            <View className="flex-row items-center mb-3">
              {[1,2,3,4,5].map(i => (
                <StarIcon key={i} size={16} color="#fbbf24" />
              ))}
              <Text className="text-green-400 font-black ml-2 tracking-wide">4.9/5</Text>
            </View>
            <Text className="text-gray-200 text-base mb-3 italic font-semibold">
              &apos;FitLife transformed my nutrition game. The personalized plans and tracking made reaching my fitness goals so much easier!&apos;
            </Text>
            <Text className="text-green-400 font-bold">- Sarah M., Pro Member</Text>
          </View>

          <SecurityBadge />

          {/* Subscribe Button */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="mb-4 overflow-hidden rounded-2xl"
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
                START {subscriptionPlans[selectedPlan].name.toUpperCase()} PLAN →
              </Text>
              <Text className="text-white/80 text-sm mt-1 font-bold">
                {billingCycle === 'monthly' 
                  ? `$${subscriptionPlans[selectedPlan].monthlyPrice}/month`
                  : `$${subscriptionPlans[selectedPlan].yearlyPrice}/year`
                }
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Terms */}
          <Text className="text-center text-gray-500 text-xs mb-8 leading-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy. 
            Subscription auto-renews unless cancelled 24 hours before renewal.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SubscriptionScreen;