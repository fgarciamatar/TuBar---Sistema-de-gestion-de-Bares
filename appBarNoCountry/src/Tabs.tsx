import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/Login/Login';
import Welcom from './components/Welcom/Welcom';
import SignUp from './components/SignUp/SignUp';


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
