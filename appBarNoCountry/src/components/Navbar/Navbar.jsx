import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem, Avatar} from '@rneui/themed';
import {Button, XGroup, XStack,YStack,ZStack} from 'tamagui';

function Navbar({role, onPressAdd, onPressEdit, onPressMenu}) {
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View style={styles.navbar}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Salon</Text>
      </View>
      {role === 'ADMIN' ? (
        <XStack gap="$1" justifyContent="center" style={{marginRight: 5}}>
          <Button size="$3" chromeless onPress={onPressAdd}>
            <Icon name="add-circle" color={'green'} />
          </Button>
          <Button size="$3" chromeless onPress={onPressEdit}>
            <Icon name="edit" />
          </Button>
          <Button size="$3" chromeless onPress={onPressMenu}>
            <Icon name="menu" />
          </Button>
          
        </XStack>
        
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate('SelectPerfil')}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/user.png')}
          />
        </View>
      </TouchableOpacity>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#AA84FC', // Color de fondo de la barra de navegación
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    // Ajusta el contenedor de la imagen según sea necesario
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default Navbar;
