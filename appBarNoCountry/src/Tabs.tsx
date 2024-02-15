import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './components/landingPage/login/login';
import Welcom from './components/landingPage/welcom/welcom';
import SignUp from './components/landingPage/signUp/signUp';

const Stack = createStackNavigator();

function Tabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing Page Login" component={Login} />
        <Stack.Screen name="Landing Page Welcom" component={Welcom} />
        <Stack.Screen name="Landing Page Sign Up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
