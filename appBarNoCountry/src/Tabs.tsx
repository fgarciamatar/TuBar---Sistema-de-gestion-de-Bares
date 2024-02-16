import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './components/landingPage/Login/Login.tsx';
import Welcom from './components/landingPage/Welcom/Welcom.tsx';
import SignUp from './components/landingPage/SignUp/SignUp.tsx';

const Stack = createStackNavigator();

function Tabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing Page Login" component={Login} />
      <Stack.Screen name="Landing Page Welcom" component={Welcom} />
      <Stack.Screen name="Landing Page Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
}

export default Tabs;
