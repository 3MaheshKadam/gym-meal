// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
// import { 
//   View, 
//   Platform, 
//   Dimensions, 
//   TouchableOpacity, 
//   Text,
//   Animated
// } from 'react-native';
// import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
// import MealPlanScreen from '../screens/MealPlanScreen';
// import SubscriptionScreen from '../screens/SubscriptionScreen';
// import DeliveryScreen from '../screens/DeliveryScreen';
// import PaymentScreen from '../screens/PaymentScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ProfileInputScreen from '../screens/ProfileInputScreen';

// const Tab = createBottomTabNavigator();
// const MealStack = createStackNavigator();
// const { width } = Dimensions.get('window');

// // Enhanced Tab Icons with Micro-animations
// const TabIcon = ({ name, focused, size = 24 }) => {
//   const animatedValue = new Animated.Value(focused ? 1 : 0);

//   React.useEffect(() => {
//     Animated.spring(animatedValue, {
//       toValue: focused ? 1 : 0,
//       useNativeDriver: true,
//       tension: 100,
//       friction: 8,
//     }).start();
//   }, [focused]);

//   const scale = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1.2],
//   });

//   const getIcon = () => {
//     const iconColor = focused ? '#10b981' : '#94a3b8';
    
//     switch (name) {
//       case 'meals':
//         return (
//           <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//             <Path 
//               d="M18 15L12 9L6 15" 
//               stroke={iconColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <Circle 
//               cx="12" 
//               cy="12" 
//               r="3" 
//               fill={focused ? iconColor : 'none'}
//               stroke={iconColor}
//               strokeWidth="2"
//             />
//             <Path 
//               d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291" 
//               stroke={iconColor}
//               strokeWidth="1.5"
//               strokeLinecap="round"
//             />
//           </Svg>
//         );
        
//       case 'subscriptions':
//         return (
//           <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//             <Path 
//               d="M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7" 
//               stroke={iconColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <Path 
//               d="M21 5L12 12L3 5" 
//               stroke={iconColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <Path 
//               d="M3 5H21V7C21 7.55228 20.4477 8 20 8H4C3.44772 8 3 7.55228 3 7V5Z" 
//               fill={focused ? iconColor : 'none'}
//               stroke={iconColor}
//               strokeWidth="2"
//             />
//           </Svg>
//         );
        
//       case 'deliveries':
//         return (
//           <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//             <Path 
//               d="M5 17H4C3.44772 17 3 16.5523 3 16V6C3 5.44772 3.44772 5 4 5H14C14.5523 5 15 5.44772 15 6V8" 
//               stroke={iconColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <Path 
//               d="M16 17H20L23 12V18C23 18.5523 22.5523 19 22 19H21" 
//               stroke={iconColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <Circle 
//               cx="7" 
//               cy="17" 
//               r="2" 
//               fill={focused ? iconColor : 'none'}
//               stroke={iconColor}
//               strokeWidth="2"
//             />
//             <Circle 
//               cx="17" 
//               cy="17" 
//               r="2" 
//               fill={focused ? iconColor : 'none'}
//               stroke={iconColor}
//               strokeWidth="2"
//             />
//           </Svg>
//         );
        
//       case 'profile':
//         return (
//           <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//             <Circle 
//               cx="12" 
//               cy="6" 
//               r="4" 
//               fill={focused ? iconColor : 'none'}
//               stroke={iconColor}
//               strokeWidth="2.5"
//             />
//             <Path 
//               d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" 
//               stroke={iconColor}
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </Svg>
//         );
        
//       default:
//         return null;
//     }
//   };

//   return (
//     <Animated.View style={{ 
//       transform: [{ scale }],
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}>
//       {getIcon()}
//     </Animated.View>
//   );
// };

// // Floating Neumorphic Tab Bar Component
// const FloatingTabBar = ({ state, descriptors, navigation }) => {
//   const tabLabels = {
//     'Meals': 'Meals',
//     'Subscriptions': 'Plans',
//     'Deliveries': 'Orders',
//     'Profile': 'Profile'
//   };

//   const tabIcons = {
//     'Meals': 'meals',
//     'Subscriptions': 'subscriptions',
//     'Deliveries': 'deliveries',
//     'Profile': 'profile'
//   };

//   return (
//     <View style={{
//       position: 'absolute',
//       bottom: Platform.OS === 'ios' ? 30 : 20,
//       left: 20,
//       right: 20,
//       height: 70,
//       backgroundColor: 'rgba(255, 255, 255, 0.95)',
//       borderRadius: 35,
//       shadowColor: '#10b981',
//       shadowOffset: {
//         width: 0,
//         height: 10,
//       },
//       shadowOpacity: 0.15,
//       shadowRadius: 25,
//       elevation: 15,
//       borderWidth: 1,
//       borderColor: 'rgba(16, 185, 129, 0.1)',
//     }}>
//       {/* Neumorphic Inner Shadow Effect */}
//       <View style={{
//         position: 'absolute',
//         top: 2,
//         left: 2,
//         right: 2,
//         bottom: 2,
//         borderRadius: 33,
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: -2,
//         },
//         shadowOpacity: 0.03,
//         shadowRadius: 4,
//       }} />
      
//       {/* Tab Items Container */}
//       <View style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         flex: 1,
//         paddingHorizontal: 16,
//         zIndex: 1,
//       }}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label = tabLabels[route.name] || route.name;
//           const iconName = tabIcons[route.name] || 'meals';
          
//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name);
//             }
//           };

//           return (
//             <TouchableOpacity
//               key={index}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               onPress={onPress}
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 paddingVertical: 8,
//                 borderRadius: 20,
//                 backgroundColor: isFocused ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
//                 marginHorizontal: 2,
//               }}
//               activeOpacity={0.7}
//             >
//               <TabIcon 
//                 name={iconName}
//                 focused={isFocused}
//                 size={22}
//               />
//               <Text style={{
//                 fontSize: 11,
//                 fontWeight: isFocused ? '700' : '600',
//                 color: isFocused ? '#10b981' : '#94a3b8',
//                 marginTop: 2,
//                 letterSpacing: 0.1,
//               }}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
      
//       {/* Bottom Accent Line */}
//       <View style={{
//         position: 'absolute',
//         bottom: 8,
//         left: '50%',
//         transform: [{ translateX: -15 }],
//         width: 30,
//         height: 3,
//         backgroundColor: '#10b981',
//         borderRadius: 2,
//         opacity: 0.6,
//       }} />
//     </View>
//   );
// };

// // Stack for Meals tab
// function MealStackNavigator() {
//   return (
//     <MealStack.Navigator screenOptions={{ headerShown: false }}>
//       <MealStack.Screen name="MealsHome" component={MealPlanScreen} />
//       <MealStack.Screen name="Subscription" component={SubscriptionScreen} />
//       <MealStack.Screen name="Delivery" component={DeliveryScreen} />
//       <MealStack.Screen name="Payment" component={PaymentScreen} />
//       <MealStack.Screen name="ProfileInput" component={ProfileInputScreen} />
//     </MealStack.Navigator>
//   );
// }

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Meals"
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={(props) => <FloatingTabBar {...props} />}
//     >
//       <Tab.Screen name="Meals" component={MealStackNavigator} />
//       <Tab.Screen name="Subscriptions" component={SubscriptionScreen} />
//       <Tab.Screen name="Deliveries" component={DeliveryScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// export default TabNavigator;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { 
  View, 
  Platform, 
  Dimensions, 
  TouchableOpacity, 
  Text
} from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import MealPlanScreen from '../screens/MealPlanScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileInputScreen from '../screens/ProfileInputScreen';

const Tab = createBottomTabNavigator();
const MealStack = createStackNavigator();
const { width } = Dimensions.get('window');

// Curved Tab Bar with Center Focus
const CurvedTabBar = ({ state, descriptors, navigation }) => {
  const tabData = [
    { name: 'Meals', icon: 'meals', label: 'Meals' },
    { name: 'Subscriptions', icon: 'plans', label: 'Plans' },
    { name: 'Deliveries', icon: 'orders', label: 'Orders' },
    { name: 'Profile', icon: 'profile', label: 'Profile' }
  ];

  const TabIcon = ({ name, focused }) => {
    const color = focused ? '#ffffff' : '#10b981';
    const size = focused ? 28 : 24;
    
    const icons = {
      meals: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="3" fill={color} />
          <Path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Path d="M4.6 9C4.73308 8.69838 4.77282 8.36381 4.714 8.03941" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </Svg>
      ),
      plans: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <Path d="M21 5L12 12L3 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      ),
      orders: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="7" cy="17" r="2" fill={focused ? color : 'none'} stroke={color} strokeWidth="2" />
          <Circle cx="17" cy="17" r="2" fill={focused ? color : 'none'} stroke={color} strokeWidth="2" />
          <Path d="M5 17H4C3.44772 17 3 16.5523 3 16V6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      ),
      profile: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="6" r="4" fill={focused ? color : 'none'} stroke={color} strokeWidth="2.5" />
          <Path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      )
    };
    
    return icons[name] || icons.meals;
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: Platform.OS === 'ios' ? 90 : 70,
      backgroundColor: '#ffffff',
    }}>
      {/* Curved Background */}
      <Svg
        width={width}
        height={Platform.OS === 'ios' ? 90 : 70}
        viewBox={`0 0 ${width} ${Platform.OS === 'ios' ? 90 : 70}`}
        style={{ position: 'absolute', top: 0 }}
      >
        <Defs>
          <LinearGradient id="tabGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ffffff" />
            <Stop offset="50%" stopColor="#f8fafc" />
            <Stop offset="100%" stopColor="#ffffff" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M 0 25 Q ${width / 2} 0 ${width} 25 L ${width} ${Platform.OS === 'ios' ? 90 : 70} L 0 ${Platform.OS === 'ios' ? 90 : 70} Z`}
          fill="url(#tabGradient)"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      </Svg>

      {/* Tab Items */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        paddingHorizontal: 20,
        zIndex: 1,
      }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabInfo = tabData[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: isFocused ? '#10b981' : 'transparent',
                shadowColor: isFocused ? '#10b981' : 'transparent',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: isFocused ? 8 : 0,
              }}
              activeOpacity={0.8}
            >
              <TabIcon name={tabInfo.icon} focused={isFocused} />
              {!isFocused && (
                <Text style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#10b981',
                  marginTop: 2,
                  letterSpacing: 0.1,
                }}>
                  {tabInfo.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Stack Navigator
function MealStackNavigator() {
  return (
    <MealStack.Navigator screenOptions={{ headerShown: false }}>
      <MealStack.Screen name="MealsHome" component={MealPlanScreen} />
      <MealStack.Screen name="Subscription" component={SubscriptionScreen} />
      <MealStack.Screen name="Delivery" component={DeliveryScreen} />
      <MealStack.Screen name="Payment" component={PaymentScreen} />
      <MealStack.Screen name="ProfileInput" component={ProfileInputScreen} />
    </MealStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Meals"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CurvedTabBar {...props} />}
    >
      <Tab.Screen name="Meals" component={MealStackNavigator} />
      <Tab.Screen name="Subscriptions" component={SubscriptionScreen} />
      <Tab.Screen name="Deliveries" component={DeliveryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
