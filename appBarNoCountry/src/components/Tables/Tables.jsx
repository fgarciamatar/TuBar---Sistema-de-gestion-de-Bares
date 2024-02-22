import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function Tables() {
  const navigation = useNavigation();
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const handleSend = () => {
    navigation.navigate('Comanda');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mesas.map((mesa, index) => (
        <View key={index} style={styles.mesa}>
          <TouchableOpacity onPress={handleSend}>
            <Text style={styles.mesaText}>{mesa}</Text>
          </TouchableOpacity>
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
