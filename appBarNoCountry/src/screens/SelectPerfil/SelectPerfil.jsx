import * as React from 'react';
import {View} from 'tamagui';
import {Text} from 'react-native-elements';
import ProfileCards from '../../components/ProfileCards/ProfileCards';
import {StyleSheet} from 'react-native';


function SelectPerfil() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu perfil:</Text>
      <View>
        <ProfileCards />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B5B2B2',
    padding: 6, // Padding general
  },
  cardContainer: {
    width: '48%', // Ancho del contenedor de tarjeta para que dos tarjetas se muestren en una fila
    marginBottom: 12, // Espacio entre las tarjetas
    backgroundColor: '#B5B2B2', // Fondo blanco de las tarjetas
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
  title: {
    fontSize: 26,
    textAlign: 'center',
  }
});

export default SelectPerfil;
