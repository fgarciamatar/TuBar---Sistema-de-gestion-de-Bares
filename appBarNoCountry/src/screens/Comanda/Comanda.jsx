import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

function Comanda() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>COMANDA</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Comanda;
