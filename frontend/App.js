// File: App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;