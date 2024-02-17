import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Text } from 'react-native-elements';
import { View } from 'react-native-reanimated/lib/typescript/Animated';


const Stack = createStackNavigator();

function Navbar() {
  return (
  <View>
    <Text>Salon</Text>
   
  </View>
  );
}

export default Navbar;