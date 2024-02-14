import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function Login() {
  const navigation = useNavigation();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleEnviar = () => {
    console.log('Nombre:', user);
    console.log('Email:', password);
  };

  const handleNavegar = () => {
    //navigation.navigate('');
  };

  return (
    <View style={styles.container}>
      <Text>
        style={styles.textTitle}
        Inicia Sesión
      </Text>
      <Image source={require('../assets/image-bar.png')} style={styles.image} />

      <View>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={user}
          onChangeText={setUser}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleNavegar}>
          <Text style={styles.textPassword}>Olvide Mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <Button title="Inicia Sesión" onPress={handleEnviar} />

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
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 5,
    padding: 10,
  },
  textTitle: {
    fontSize: 30,
    marginBottom: 10,
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
  },
  createCount: {
    color: '#3F86FC',
  },
});

export default Login;
