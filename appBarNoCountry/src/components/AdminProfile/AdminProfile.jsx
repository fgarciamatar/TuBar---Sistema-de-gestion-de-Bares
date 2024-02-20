import * as React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native-elements';
import { View } from 'tamagui';


function AdminProfile() {
  return (
<View style={styles.container}>
<View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/addmin.png')}
        />
      </View>
      <Text style={[styles.titleName]}>Nombre</Text>
      <Text style={[styles.titleProfile]}>Admin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Centrar elementos horizontalmente
  },
  imageContainer: {
    marginBottom: 10, // Espacio entre la imagen y el texto
  },
  image: {
    width: 150,
    height: 150,
  },

  titleName: {
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centrar texto horizontalmente
    fontSize:20,
  },
  titleProfile: {
    fontSize:14,
  },
 
});

export default AdminProfile;