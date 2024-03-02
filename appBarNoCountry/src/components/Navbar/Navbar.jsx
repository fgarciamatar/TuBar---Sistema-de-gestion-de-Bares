import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Navbar({role}) {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Salon</Text>
        <Text style={styles.title}>{role}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SelectPerfil')}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image}
            source={require('../../assets/user.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff', // Color de fondo de la barra de navegación
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    // Ajusta el contenedor de la imagen según sea necesario
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default Navbar;

