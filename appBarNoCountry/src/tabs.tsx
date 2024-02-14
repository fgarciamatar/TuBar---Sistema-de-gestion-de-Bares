import * as React from 'react';
import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './login/login';

const Stack = createStackNavigator();

function Tabs() {
  return (
    <NavigationContainer children>
      <Stack.Navigator>
        <Stack.Screen name="Landing Page Login" component={Login} />
        <Stack.Screen name="Landing Page Login" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
