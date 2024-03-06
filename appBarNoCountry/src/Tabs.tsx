import * as React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import Login from './screens/Login/Login';
import Welcom from './screens/Welcom/Welcom';
import SignUp from './screens/SignUp/SignUp';
import SelectPerfil from './screens/SelectPerfil/SelectPerfil.jsx';
import ManageProfiles from './screens/ManageProfiles/ManageProfiles.jsx';
import Salon from './screens/Salon/Salon.jsx';
import Password from './screens/Password/Password';
import Order from './screens/Order/Order.tsx';
import ProfilePin from './screens/ProfilePin/ProfilePin.jsx';
import Menu from './screens/Menu/Menu.tsx';
import OrderDetail from './screens/orderDetail/orderDetail.jsx';
import Receipt from './screens/Receipt/Receipt';
import {BillOrder} from './interfaces/interface';
import Bill from './screens/BillOrder/Bill.tsx';
import CodePassword from "./screens/CodePassword/CodePassword.jsx"
// import Kitchen from "./screens/Kitchen/Kitchen.jsx"

export type RootStackParamList = {
  Welcom: undefined;
  Login: undefined;
  SignUp: undefined;
  Password: undefined;
  SelectPerfil: undefined;
  Salon: undefined;
  Order: undefined;
  Menu: undefined;
  Receipt: undefined;
  ProfilePin: undefined;
  ManageProfile: undefined;
  Factura: {billOrder: BillOrder; tableNumber: number};
  CodePassword: undefined;
  Cocina: undefined;
};
export type ScreenProp = StackNavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function Tabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcom" component={Welcom} />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Password"
        component={Password}
      />
      <Stack.Screen
        name="SelectPerfil"
        component={SelectPerfil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageProfile"
        component={ManageProfiles}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Salon"
        component={Salon}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Menu"
        component={Menu}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Order"
        component={Order}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Factura"
        component={Bill}
      />

      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="ProfilePin"
        component={ProfilePin}
      />
      {/* <Stack.Screen name="Detalle del Pedido" component={OrderDetail} /> */}
      <Stack.Screen
        name="Receipt"
        component={Receipt}
        options={{headerShown: false}}
      />

<Stack.Screen
        name="CodePassword"
        component={CodePassword}
      />
      {/* <Stack.Screen
        name="Cocina"
        component={Kitchen}
      /> */}
      
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerScreen: {
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
  },
});

export default Tabs;
