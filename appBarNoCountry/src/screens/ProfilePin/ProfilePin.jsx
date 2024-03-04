import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {postLoginProfile} from '../../apis';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setProfileSession} from '../../redux/actions';

function ProfilePin({route}) {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();
  const {idProfile, role, name} = route.params;

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const profileLogin = await postLoginProfile(pin, idProfile);
    const {profile} = profileLogin;
    dispatch(setProfileSession(profile));
    if (profileLogin.status) {
      Alert.alert('Exito', 'PIN correcto.');
      navigation.navigate('Salon', {role: role});
    } else if (!profileLogin.status) {
      Alert.alert('Error', 'PIN incorrecto. Por favor, inténtalo de nuevo.');
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          role === 'ADMIN'
            ? require('../../assets/menu/addmin.png')
            : require('../../assets/menu/waiter.png')
        }
      />
      <Text>{name}</Text>
      <Text style={styles.title}>Ingrese el Pin (2bc6e8)</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry={true}
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

export default ProfilePin;
const styles = StyleSheet.create({
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
