import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { 
  View, 
  Platform, 
  Dimensions, 
  TouchableOpacity, 
  Text,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, G } from 'react-native-svg';
import MealPlanScreen from '../screens/MealPlanScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileInputScreen from '../screens/ProfileInputScreen';

const Tab = createBottomTabNavigator();
const MealStack = createStackNavigator();
const { width } = Dimensions.get('window');

// Enhanced Modern Tab Bar
const ModernTabBar = ({ state, descriptors, navigation }) => {
  const tabData = [
    { name: 'Meals', icon: 'meals', label: 'Meals' },
    { name: 'Subscriptions', icon: 'plans', label: 'Plans' },
    { name: 'Deliveries', icon: 'orders', label: 'Orders' },
    { name: 'Profile', icon: 'profile', label: 'Profile' }
  ];

  const TabIcon = ({ name, focused }) => {
    const size = focused ? 26 : 24;
    
    const icons = {
      meals: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path 
            d="M12 2C10.3431 2 9 3.34315 9 5V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V3C7 2.44772 6.55228 2 6 2C5.44772 2 5 2.44772 5 3V8C5 9.65685 6.34315 11 8 11V21C8 21.5523 8.44772 22 9 22C9.55228 22 10 21.5523 10 21V11H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V11C14.6569 11 16 9.65685 16 8V3C16 2.44772 15.5523 2 15 2C14.4477 2 14 2.44772 14 3V8C14 8.55228 13.5523 9 13 9C12.4477 9 12 8.55228 12 8V5C12 3.34315 13.3431 2 15 2H16C17.1046 2 18 2.89543 18 4V8C18 10.2091 16.2091 12 14 12V21C14 21.5523 14.4477 22 15 22C15.5523 22 16 21.5523 16 21V12C18.2091 12 20 10.2091 20 8V4C20 2.89543 19.1046 2 18 2H15Z" 
            fill={focused ? '#ffffff' : '#6b7280'}
          />
        </Svg>
      ),
      plans: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path 
            d="M9 2C7.89543 2 7 2.89543 7 4V6H5C3.89543 6 3 6.89543 3 8V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V8C21 6.89543 20.1046 6 19 6H17V4C17 2.89543 16.1046 2 15 2H9ZM9 4H15V8H9V4ZM5 8H7V10H9V8H15V10H17V8H19V20H5V8Z" 
            fill={focused ? '#ffffff' : '#6b7280'}
          />
          <Path d="M8 13H10V15H8V13Z" fill={focused ? '#ff6b35' : '#6b7280'}/>
          <Path d="M11 13H13V15H11V13Z" fill={focused ? '#ff6b35' : '#6b7280'}/>
          <Path d="M14 13H16V15H14V13Z" fill={focused ? '#ff6b35' : '#6b7280'}/>
        </Svg>
      ),
      orders: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path 
            d="M7 4C6.44772 4 6 4.44772 6 5V6H4C3.44772 6 3 6.44772 3 7V19C3 19.5523 3.44772 20 4 20H6V21C6 21.5523 6.44772 22 7 22H17C17.5523 22 18 21.5523 18 21V20H20C20.5523 20 21 19.5523 21 19V7C21 6.44772 20.5523 6 20 6H18V5C18 4.44772 17.5523 4 17 4H7ZM8 6H16V18H8V6ZM5 8H6V18H5V8ZM18 8H19V18H18V8Z" 
            fill={focused ? '#ffffff' : '#6b7280'}
          />
          <Circle cx="12" cy="12" r="2" fill={focused ? '#ffffff' : '#6b7280'}/>
        </Svg>
      ),
      profile: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle 
            cx="12" 
            cy="8" 
            r="4" 
            fill={focused ? '#ffffff' : 'none'} 
            stroke={focused ? '#ff6b35' : '#6b7280'} 
            strokeWidth="2"
          />
          <Path 
            d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20Z" 
            fill={focused ? '#ff6b35' : 'none'}
            stroke={focused ? '#ff6b35' : '#6b7280'} 
            strokeWidth="2"
          />
        </Svg>
      )
    };
    
    return icons[name] || icons.meals;
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#0a0e27', '#1a1f3a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        {/* Top Border Accent */}
      

        {/* Tab Items */}
        <View style={styles.tabItemsContainer}>
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
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                {isFocused ? (
                  <LinearGradient
                    colors={['#ff6b35', '#f7931e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.activeTabBackground}
                  >
                    <View style={styles.activeTabContent}>
                      <TabIcon name={tabInfo.icon} focused={isFocused} />
                      <Text style={styles.activeTabLabel}>{tabInfo.label}</Text>
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactiveTabContent}>
                    <TabIcon name={tabInfo.icon} focused={isFocused} />
                    <Text style={styles.inactiveTabLabel}>{tabInfo.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 90,
    backgroundColor: 'transparent',
  },
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 24,
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingHorizontal: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 50,
  },
  activeTabBackground: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    shadowColor: '#ff6b35',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  activeTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  inactiveTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  inactiveTabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 3,
    letterSpacing: 0.3,
  },
});

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
      screenOptions={{ 
        headerShown: false,
      }}
      tabBar={(props) => <ModernTabBar {...props} />}
    >
      <Tab.Screen name="Meals" component={MealStackNavigator} />
      <Tab.Screen name="Subscriptions" component={SubscriptionScreen} />
      <Tab.Screen name="Deliveries" component={DeliveryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;