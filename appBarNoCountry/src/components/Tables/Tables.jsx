import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function Tables() {
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mesas.map((mesa, index) => (
        <View key={index} style={styles.mesa}>
          <Text style={styles.mesaText}>{mesa}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  mesa: {
    width: '30%', // Para tener tres mesas por fila
    aspectRatio: 1, // Para que la mesa tenga una relación de aspecto cuadrada
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 10, // Borde redondeado
    marginBottom: 20,
  },
  mesaText: {
    fontSize: 24, // Tamaño de texto más grande
  },
});

export default Tables;



