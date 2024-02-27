import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {View} from 'tamagui';



function ProfileCards({name, role, id}) {
  const navigation = useNavigation();
 
  const handleSalonAdm = () => {
    navigation.navigate('ProfilePin',{idProfile: id,role: role,name: name});
  };


  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSalonAdm} style={styles.cardContainer}>
          <View>
            <Image
              style={styles.image}
              source={role === "ADMIN" ? require('../../assets/menu/addmin.png') : require('../../assets/menu/waiter.png')}
            />
            <Text style={[styles.titleName]}>{name}</Text>
            <Text style={[styles.titleProfile]}>{role}</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}

export default ProfileCards;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center', 
    paddingVertical: 20,
    backgroundColor: '#B5B2B2',
    marginBottom:30// Centrar elementos horizontalmente
  },
  imageContainer: {
    marginBottom: 10, // Espacio entre la imagen y el texto
  },
  image: {
    width: 150,
    height: 150,
  },

  titleName: {
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centrar texto horizontalmente
    fontSize:20,
  },
  titleProfile: {
    fontSize:14,
  },
});
