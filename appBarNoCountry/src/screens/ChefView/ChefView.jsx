import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {Spinner} from 'tamagui';
import {View} from 'tamagui';
import ChefCards from '../../components/ChefCards/ChefCards';
import {useSelector} from 'react-redux';

function ChefView() {
  const viewOrders = useSelector(state => state.reducers.orders);
  useEffect(() => {
    console.log(viewOrders);
  }, []);

  
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Cocina</Text>
        <ScrollView>
          <View style={styles.profilesContainer}>
          </View>

        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#EEEBEB',
    borderWidth: 1,
    width:'100%',
    height:'100%'
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Alinear las columnas en el espacio disponible
    paddingHorizontal: 10, // Añadir espacio horizontal para evitar que los perfiles toquen los bordes
    paddingBottom: 10, // Añadir espacio en la parte inferior para evitar que los perfiles toquen el borde inferior
  },
  title: {
    fontSize: 26,
    color: '#0305C5',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10, // Ajustar el espacio vertical para centrar el texto
  },
});

export default ChefView;

