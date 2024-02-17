import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {View} from 'tamagui';
import AdminProfile from '../AdminProfile/AdminProfile';
import WaiterProfile from '../WaiterProfile/WaiterProfile';

function ProfileCards() {
  const navigation = useNavigation();

  const handleSalonWaiter = () => {
    navigation.navigate('Salon');
  };
  const handleSalonAdm = () => {
    navigation.navigate('AdminPinScreen');
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSalonAdm} style={styles.cardContainer}>
        <AdminProfile />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalonWaiter} style={styles.cardContainer}>
        <WaiterProfile />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalonWaiter} style={styles.cardContainer}>
        <WaiterProfile />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalonWaiter} style={styles.cardContainer}>
        <WaiterProfile />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalonWaiter} style={styles.cardContainer}>
        <WaiterProfile />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalonWaiter} style={styles.cardContainer}>
        <WaiterProfile />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalonWaiter} style={styles.cardContainer}>
        <WaiterProfile />
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
}

export default ProfileCards;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row', // Mostrar los elementos en fila
    flexWrap: 'wrap', // Permitir que los elementos se envuelvan en múltiples líneas
    justifyContent: 'space-between', // Distribuir el espacio entre los elementos

    padding: 6, // Padding general
  },
  cardContainer: {
    width: '48%', // Ancho del contenedor de tarjeta para que dos tarjetas se muestren en una fila
    marginBottom: 12, // Espacio entre las tarjetas
    backgroundColor: '#FFFF', // Fondo blanco de las tarjetas
    borderRadius: 15, // Bordes redondeados de las tarjetas
    padding: 12, // Padding dentro del contenedor de tarjeta
    shadowColor: '#000000', // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Radio de la sombra
    elevation: 3, // Elevación de la tarjeta
  },
});
