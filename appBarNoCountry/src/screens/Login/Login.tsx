import React, { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSend = () => {
    console.log('Nombre:', user);
    console.log('Password:', password);

    navigation.navigate("SelectPerfil" as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario</Text>
      <Image
        source={require('../../assets/image-bar.png')}
        style={styles.image}
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={user}
          onChangeText={setUser}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.textPassword}>Olvide Mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <Button title="Inicia Sesión" onPress={handleSend} />

      <View style={styles.createCountContainer}>
        <Text>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.createCount}>Registrarme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 200,
    height: 200,
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 5,
    padding: 10,
  },
  textTitle: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'left',
    padding: 10,
  },
  textPassword: {
    color: '#3F86FC',
    textAlign: 'right',
  },
  button: {
    width: 186,
    borderRadius: 5,
    padding: 10,
  },
  createCountContainer: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
  },
  createCount: {
    color: '#3F86FC',
  },
});

export default Login;
