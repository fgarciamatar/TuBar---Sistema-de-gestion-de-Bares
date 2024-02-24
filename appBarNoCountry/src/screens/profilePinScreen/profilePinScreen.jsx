import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, TextInput, View } from 'react-native';
import { Text, ScrollView } from 'react-native-elements';
import { postLoginProfile } from '../../apis';
import { useNavigation } from '@react-navigation/native';

function ProfilePinScreen({ route }) {
  const [pin, setPin] = useState('');
  const { idProfile, role, name } = route.params;
  const navigation = useNavigation();

  const handleLogin = async () => {
    const profileLogin = await postLoginProfile(pin, idProfile);
    if (profileLogin.status) {
      Alert.alert('Exito', 'PIN correcto.');
      navigation.navigate('Salon');
    } else if (!profileLogin.status) {
      Alert.alert('Error', 'PIN incorrecto. Por favor, inténtalo de nuevo.');
      setPin('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              role === 'ADMIN'
                ? require('../../assets/menu/addmin.png')
                : require('../../assets/menu/waiter.png')
            }
          />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>Ingrese el Pin (de4871)</Text>
        <TextInput
          style={styles.input}
          placeholder="PIN"
          value={pin}
          onChangeText={setPin}
          secureTextEntry={true}
        />
        <Button title="Ingresar" onPress={handleLogin} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5B2B2',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ProfilePinScreen;
