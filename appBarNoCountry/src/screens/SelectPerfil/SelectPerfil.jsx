import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {Spinner} from 'tamagui';
import {View} from 'tamagui';
import ProfileCards from '../../components/ProfileCards/ProfileCards';
import {useSelector} from 'react-redux';

function SelectPerfil() {
  const profilesSelectPerfil = useSelector(state => state.reducers.profiles);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona tu perfil</Text>
        <ScrollView>
          {profilesSelectPerfil.profiles !== undefined &&
          profilesSelectPerfil.profiles ? (
            profilesSelectPerfil?.profiles.map(profile => (
              <ProfileCards
                name={profile.name}
                role={profile.role}
                key={profile.id}
                id={profile.id}
              />
            ))
          ) : (
            <Spinner size="large" color="$orange10" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 100,
    borderWidth: 1,
  },
  cardContainer: {
    width: '48%', // Ancho del contenedor de tarjeta para que dos tarjetas se muestren en una fila
    marginBottom: 12, // Espacio entre las tarjetas
    backgroundColor: '#fff', // Fondo blanco de las tarjetas
    borderRadius: 15, // Bordes redondeados de las tarjetas
    padding: 12, // Padding dentro del contenedor de tarjeta
    shadowColor: '#000000',
     // Color de la sombra
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
    backgroundColor: '#D0BBFD',
    fontWeight: "bold",
    padding: 10,
  },
});

export default SelectPerfil;
