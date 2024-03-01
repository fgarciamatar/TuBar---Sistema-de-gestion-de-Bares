import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import Header from '../../components/Salon/HeaderSalon/HeaderSalon';

const MenuSalon = () => {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.EditContainer}>
        <TouchableOpacity style={styles.containers}>
          <Text style={styles.texts}>Añadir mesas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containers}>
          <Text style={styles.texts}>Editar numero mesas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containers}>
          <Text style={styles.texts}>Ordenar salon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containers}>
          <Text style={styles.texts}>Mover mesa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    gap: 50,
  },
  EditContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  containers: {
    borderWidth: 1,
    borderColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    padding: 5,
  },
  texts: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
  },
  MenuViewContainer: {
    position: 'absolute',
    right: 0,
    top: 80,
  },
});

export default MenuSalon;
