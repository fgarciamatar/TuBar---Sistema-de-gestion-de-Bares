import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

function Menu() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Menu</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Menu;