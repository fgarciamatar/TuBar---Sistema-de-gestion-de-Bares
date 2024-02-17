import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
<<<<<<< HEAD
import Login from './components/Login/Login';
import Welcom from './components/Welcom/Welcom';
import SignUp from './components/SignUp/SignUp';
=======
import Login from './components/landingPage/Login/Login.tsx';
import Welcom from './components/landingPage/Welcom/Welcom.tsx';
import SignUp from './components/landingPage/SignUp/SignUp.tsx';
>>>>>>> a618f134121e920299ba62aadb9f8e78d44b6f1d

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
