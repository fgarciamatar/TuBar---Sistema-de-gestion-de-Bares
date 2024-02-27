import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
<<<<<<< HEAD
import {ScrollView, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
=======
import { StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
>>>>>>> develop
import {View} from 'tamagui';



function ProfileCards({name, role, id}) {
  const navigation = useNavigation();
 
  const handleSalonAdm = () => {
    navigation.navigate('ProfilePin',{idProfile: id,role: role,name: name});
  };


  return (
<<<<<<< HEAD
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
=======
>>>>>>> develop
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
<<<<<<< HEAD
    </ScrollView>
=======
>>>>>>> develop
  );
}

export default ProfileCards;

const styles = StyleSheet.create({
<<<<<<< HEAD
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#B5B2B2',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center', // Centrar elementos horizontalmente
=======
  container: {
    flexGrow: 1,
    alignItems: 'center', 
    paddingVertical: 20,
    backgroundColor: '#B5B2B2',
    marginBottom:30// Centrar elementos horizontalmente
>>>>>>> develop
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
