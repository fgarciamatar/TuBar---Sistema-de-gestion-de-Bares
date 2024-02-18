import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Welcom() {
  const navigation = useNavigation();

  const handleSend = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View>
      <Text style={styles.titleWelcom}>Bienvenido a NOMBRE</Text>
      <View>
        <Image
          style={styles.image}
          source={require('../../assets/image-bar.png')}
        />
      </View>

      <View style={styles.continueContainer}>
        <Text style={styles.privacityText}>
          Lee nuestra Política de Privacidad .Toca “Acepto y continúo” para
          aceptar los Términos de Servicio.
        </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Login' as never)}
          style={styles.sendButton}>
          <Text style={styles.textButton}>Aceptar y Continuar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fromContainer}>
        <Text style={{color: "#fff"}}>from</Text>
        <Text style={styles.fromText}>{'<c16-122>'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomContainer: {
    backgroundColor: '#0305C5',
    height: '100%',
    padding: 10,
  },
  titleWelcom: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    paddingTop: 50,
  },
  textBar: {
    color: '#EBB426',
    fontSize: 30,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  continueContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  privacityText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    padding: 20,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#D0BBFD',
    width: 205,
    borderRadius: 10,
    maxWidth: 190,
    maxHeight: 50,
    borderWidth: 1,
    borderColor: '#AA84FC',
  },
  textButton:{
    fontWeight: "700",
    color: "#4505D0",
    textAlign: "center",
    fontSize: 17,
  },
  fromContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  fromText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
  image: {
    width: 200,
    height: 200,
  },
  privacity: {
    color: '#470000',
  },

});

export default Welcom;
