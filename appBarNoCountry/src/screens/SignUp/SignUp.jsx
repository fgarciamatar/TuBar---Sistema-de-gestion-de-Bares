import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { Button, Spinner } from 'tamagui'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { signUpApi } from '../../apis';
import validation from '../../validation';

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setloading] = useState(false)

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const formState = {name, userName, email, password}; // Estado actual del formulario
    const errors = validation(formState); // Validar el formulario
    setErrors(errors); // Actualizar el estado de los errores
    setIsValid(Object.keys(errors).length === 0); // Verificar si el formulario es válido
  }, [name, userName, email, password]);//

  const navigation = useNavigation();

  const handleSend = async () => {
    setloading(true)
    const userData = {
      name: name,
      userName: userName,
      email: email,
      password: password,
    };

    try {
      const response = await signUpApi(userData);
      console.log('Respuesta del registro:', response);
      setloading(false)
      Alert.alert('Éxito', 'Usuario creado correctamente', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.log('Error al registrar:', error);
      setloading(false)
      Alert.alert('Error', 'Usuario ya Existe', [
        {
          text: 'OK',
          onPress: () => {
          },
        },
      ]);
    }
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.signUpContainer}>
      <View style={styles.acountContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/landing-page.png')}
        />
        <Text>Completa los campos para crear una cuenta</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.labelInput}>Nombre del Bar/Restaurante</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.labelInput}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

        <Text style={styles.labelInput}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.labelInput}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.sendContainer}>
        { loading ?
          <Spinner size="large" color="$orange10" />:
          <TouchableOpacity
          onPress={handleSend}
          style={[styles.button, !isValid && styles.disabledButton]}
          disabled={!isValid}>
          <Text style={styles.textButton}>Regístrame</Text>
        </TouchableOpacity>
        }
        

        <View style={styles.logInContainer}>
          <Text>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={styles.textLogIn}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acountContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    padding: 30,
    marginTop: 20,
  },
  image: {
    backgroundColor: '#fff',
    borderRadius: 200,
    width: 60,
    height: 60,
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    padding: 20,
  },
  input: {
    padding: 10,
    backgroundColor: '#D7D7D7',
    width: 280,
    height: 30,
    borderRadius: 8,
  },
  labelInput: {
    fontWeight: 'bold',
  },
  sendContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  },
  button: {
    width: 186,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logInContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 20,
  },
  textLogIn: {
    color: '#3F86FC',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default SignUp;
