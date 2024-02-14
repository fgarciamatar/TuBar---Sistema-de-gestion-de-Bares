/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/tabs';

import {useColorScheme, View} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  return (
    <NavigationContainer children>
      <Tabs />
    </NavigationContainer>
  );
}

export default App;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return <View></View>;
}
