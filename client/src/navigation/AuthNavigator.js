import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  StartScreen,
} from '../screens';

const Stack = createStackNavigator();

export default AuthNavigator = () => {
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Reset" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
