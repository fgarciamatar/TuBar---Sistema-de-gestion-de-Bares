import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

function Welcom () {
  const navigation = useNavigation();
  
  const handleSend = () => {
    navigation.navigate("Login" as never);
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

      <View>
        <Text>
          Lee nuestra
          <TouchableOpacity onPress={() => console.log("Política de Privacidad presionada")}>
            <Text style={styles.privacity}>Política de Privacidad</Text>
          </TouchableOpacity>
          .Toca “Acepto y continúo” para aceptar los Términos de Servicio.
        </Text>
        <Button
          title="ACEPTAR Y CONTINUAR"
          onPress={handleSend}
        />
      </View>

      <View style={styles.fromContainer}>
        <Text>from</Text>
        <Text>c16-122</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWelcom: {
    fontSize: 28,
  },
  image: {
    width: 200,
    height: 200,
  },
  privacity: {
    color: '#470000',
  },
  sendButton: {
    padding: 10,
    color: '#DBDBDB',
    width: 135,
  },
  fromContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export default Welcom;
