import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login/Login.tsx';
import Welcom from './screens/Welcom/Welcom.tsx';
import SignUp from './screens/SignUp/SignUp.tsx';
import SelectPerfil from './screens/SelectPerfil/SelectPerfil.jsx';
import Salon from "./screens/Salon/Salon.jsx"
import AdminPinScreen from './screens/AdminPinScreen/AdminPinScreen.jsx';


const Stack = createStackNavigator();

function Tabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcom" component={Welcom} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SelectPerfil" component={SelectPerfil} />
      <Stack.Screen name="Salon" component={Salon} />
      <Stack.Screen name="AdminPinScreen" component={AdminPinScreen} />
    </Stack.Navigator>
  );
}

export default Tabs;
