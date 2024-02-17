import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

function SignUp() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSend = () => {
    console.log('Nombre:', user);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View>
      <Text style={styles.textLogIn}>Registro</Text>

      <View style={styles.acountContainer}>
<<<<<<< HEAD:appBarNoCountry/src/components/SignUp/SignUp.tsx
        <Image source={require("../../assets/image-bar.png")} />
=======
        <Image source={require('../../../assets/image-bar.png')} />
>>>>>>> a618f134121e920299ba62aadb9f8e78d44b6f1d:appBarNoCountry/src/components/landingPage/SignUp/SignUp.tsx
        <Text>Completa los campos para crear una cuenta</Text>
      </View>

      <View style={styles.formContainer}>
        <Text>Usuario</Text>
        <TextInput style={styles.input} value={user} onChangeText={setUser} />
        <Text>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.sendContainer}>
        <Button onPress={handleSend} title="Registrame" />
        <Text>
          ¿Ya tienes una cuenta?
          <TouchableOpacity>
            <Text style={styles.textLogIn}>Inicia sesión</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textSigUp: {
    textAlign: 'left',
    padding: 10,
    borderBottomColor: 'gray',
  },
  input: {
    padding: 10,
    color: '#D7D7D7',
  },
  button: {
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#D7D7D7',
  },
  textLogIn: {
    color: '#3F86FC',
  },
  sendContainer: {
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  acountContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default SignUp;
