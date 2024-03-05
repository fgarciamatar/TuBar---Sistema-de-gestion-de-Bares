import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';

function CodePassword() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
      const handleSend = () => {
       console.log("hola");
      };
  return (
    <View style={styles.container}>
      <Text>Ingrese el codigo que se le envio a su correo electronico:</Text>

      <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Oculta la contraseña si showPassword es falso
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSend} style={styles.button}>
          <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  passwordInput: {
    flex: 1,
    height: 35,
    padding: 10,
    backgroundColor: '#D7D7D7',
    borderRadius: 8,
    borderTopRightRadius:0 ,
    borderBottomRightRadius: 0
  },
  eyeIcon: {
    fontSize: 15,
    paddingHorizontal: 10,
    height: 35,
    padding: 10,
    backgroundColor: '#D7D7D7',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CodePassword;
