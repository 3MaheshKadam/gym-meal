import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPScreen from '../screens/OTPScreen';
import TabNavigator from './TabNavigator';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  useEffect(() => {
    // Configure Android Navigation Bar
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#0a0e27');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <>
      {/* Global Status Bar Configuration */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="SignIn" 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: '#0a0e27' },
            // Modern card animation
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        >
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen}
            options={{
              animationEnabled: true,
            }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{
              animationEnabled: true,
            }}
          />
          <Stack.Screen 
            name="OTP" 
            component={OTPScreen}
            options={{
              animationEnabled: true,
            }}
          />
           <Stack.Screen 
            name="Payment" 
            component={PaymentScreen}
            options={{
              animationEnabled: true,
            }}
          />
          <Stack.Screen 
            name="Tab" 
            component={TabNavigator}
            options={{
              animationEnabled: true,
              gestureEnabled: false, // Prevent swipe back from tab navigator
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default RootNavigator;