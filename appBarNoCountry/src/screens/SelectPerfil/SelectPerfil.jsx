import  React , {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import {Spinner} from 'tamagui';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'tamagui';
import ProfileCards from '../../components/ProfileCards/ProfileCards';
import { getTables } from '../../redux/actions';


function SelectPerfil() {

const profilesSelectPerfil = useSelector(state => state.reducers.profiles);
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables());
  }, []); 

 


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu perfil:</Text>
      <View>
        {profilesSelectPerfil.profiles !== undefined && profilesSelectPerfil.profiles ? profilesSelectPerfil?.profiles.map(profile => (
          <ProfileCards name={profile.name} role={profile.role} key={profile.id} id={profile.id} />
        )): <Spinner size="large" color="$orange10" />}
        <TouchableOpacity  onPress={()=>{dispatch(getTables())}}>
          <Text>
            TEST
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B5B2B2',
    padding: 6, // Padding general
  },
  cardContainer: {
    width: '48%', // Ancho del contenedor de tarjeta para que dos tarjetas se muestren en una fila
    marginBottom: 12, // Espacio entre las tarjetas
    backgroundColor: '#B5B2B2', // Fondo blanco de las tarjetas
    borderRadius: 15, // Bordes redondeados de las tarjetas
    padding: 12, // Padding dentro del contenedor de tarjeta
    shadowColor: '#000000', // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Radio de la sombra
    elevation: 3, // Elevación de la tarjeta
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
});

export default SelectPerfil;