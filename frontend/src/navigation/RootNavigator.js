// File: src/navigation/RootNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen 
            name="Login" 
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Registration" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // App Stack
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;