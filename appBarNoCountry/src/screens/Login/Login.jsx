import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { apiLogin } from '../../apis';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSend = async () => {
    const resp = await apiLogin(userName, password);
    if (resp.status === true) {
      Alert.alert("Exito",'Sesion iniciada');
      navigation.navigate('SelectPerfil');
    } else {
      Alert.alert('Usuario no encontrado, por favor intentelo de nuevo.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handlePassword = () => {
    navigation.navigate('Password');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/landing-page.png')}
        style={styles.image}
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handlePassword}>
          <Text style={styles.textPassword}>Olvide Mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Text style={styles.textButton}>Inicia sesión</Text>
      </TouchableOpacity>

      <View style={styles.createCountContainer}>
        <Text>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.createCount}>Registrarme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 174,
    height: 163.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  formContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 40,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#D7D7D7',
    padding: 10,
    width: 288,
    height: 30,
  },
  textTitle: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'left',
    padding: 10,
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textPassword: {
    color: '#3F86FC',
    textAlign: 'right',
    fontWeight: '400',
    fontFamily: 'Montserrat',
  },
  button: {
    width: 186,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginTop: 40,
  },
  createCountContainer: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 50,
  },
  createCount: {
    color: '#3F86FC',
    lineHeight: 17.07,
  },
});

export default Login;
