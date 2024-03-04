import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {Button, XStack, Input, View, YStack} from 'tamagui';
import {Icon} from '@rneui/themed';

function ProfileCards({
  name,
  role,
  id,
  rol,
  onPressAdd,
  onPressEdit,
  onPressDelete,
}) {
  const navigation = useNavigation();

  const handleSalonAdm = () => {
    navigation.navigate('ProfilePin', {idProfile: id, role: role, name: name});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSalonAdm} style={styles.cardContainer}>
        <View>
          <Image
            style={styles.image}
            source={
              role === 'ADMIN'
                ? require('../../assets/menu/addmin.png')
                : require('../../assets/menu/waiter.png')
            }
          />
          <YStack
            gap="$1"
            justifyContent="center"
            alignItems="center"
            padding="$2">
            <Text style={[styles.titleName]}>{name}</Text>
            <Text style={[styles.titleProfile]}>{role}</Text>
            {rol == 'ADMIN' ? (
              <XStack gap="$1" justifyContent="center" style={{marginRight: 5}}>
                <Button size="$3" chromeless onPress={onPressEdit}>
                  <Icon name="edit" color={'yellow'} />
                </Button>
                <Button size="$3" chromeless onPress={onPressDelete}>
                  <Icon name="delete" color={'red'} />
                </Button>
              </XStack>
            ) : null}
          </YStack>
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
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#EEEBEB',
    // Centrar elementos horizontalmente
  },
  imageContainer: {
    marginBottom: 10,
    // Espacio entre la imagen y el texto
  },
  cardContainer: {
    padding: 20,
    width: '92%',
    display: 'flex',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
  },

  titleName: {
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centrar texto horizontalmente
    fontSize: 20,
  },
  titleProfile: {
    fontSize: 14,
  },
});
