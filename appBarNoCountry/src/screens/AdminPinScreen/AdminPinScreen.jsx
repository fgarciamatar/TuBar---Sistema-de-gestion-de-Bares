import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert , Image} from 'react-native';
import { Text } from 'react-native-elements';


function AdminPinScreen({ navigation }) {
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (pin === '1234') {
      // PIN correcto, dirigir a la pantalla de inicio (home)
      navigation.navigate('Salon');
    } else {
      // PIN incorrecto, mostrar un mensaje de error
      Alert.alert('Error', 'PIN incorrecto. Por favor, inténtalo de nuevo.');
      // Limpiar el campo de PIN
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={require('../../assets/addmin.png')} />
      </View>
      <Text style={styles.title}>Ingrese el Pin de Administrador (1234)</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN de administrador"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  imageContainer: {
    marginBottom: 10, // Espacio entre la imagen y el texto
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    textAlign: 'center', // Centrar texto horizontalmente
    fontSize:20,
  }
});

export default AdminPinScreen;



