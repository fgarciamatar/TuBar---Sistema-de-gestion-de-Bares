import React from 'react';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { View } from 'tamagui';

function Kitchen() {
  const profilesSelectPerfil = useSelector(state => state.reducers.profiles);

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona tu perfil</Text>
      </View>

  );
}

export default Kitchen;