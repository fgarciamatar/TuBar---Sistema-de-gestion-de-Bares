import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {Button, XStack, Input, YStack} from 'tamagui';

interface DialogProfileProps {
  isVisible: boolean;
  title: string;
  labelProp1?: string;
  labelProp2?: string;
  labelProp3?: string;
  prop1?: string;
  prop2?: string;
  prop3?: string;
  onHidePress: () => void;
  onChangeProp1: (text: string) => void;
  onChangeProp2: (text: string) => void;
  onChangeProp3: (text: string) => void;
  onConfirm: () => void;
}

const Dialog: React.FC<DialogProfileProps> = ({
  isVisible,
  title,
  labelProp1,
  labelProp2,
  labelProp3,
  prop1,
  prop3,
  prop2,
  onChangeProp1,
  onHidePress,
  onConfirm,
  onChangeProp2,
  onChangeProp3,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onHidePress}>
      <TouchableWithoutFeedback onPress={onHidePress}>
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {title}
              </Text>
              <View style={styles.buttonsView}>
               <YStack gap="$1"
            justifyContent='center'
            alignItems='center'
            padding="$2">
              {labelProp1 && (
                <XStack
                  gap="$2"
                  width={'100%'}
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginRight: 5 }}>
                    <YStack width={'35%'}>
                    <Text style={styles.descriptionText}>{labelProp1}</Text>
                    </YStack>
                  
                  <Input
                    value={prop1}
                    onChangeText={(text: string) => {
                      onChangeProp1(text);
                    }}
                    flex={1}
                    size="$3"
                    borderWidth={2}
                    placeholder={`Nombre Completo`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                </XStack>
              )}
              {labelProp2 && (
                <XStack
                  gap="$2"
                  width={'100%'}
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginRight: 5 }}>
                  <YStack width={'35%'}>
                    <Text style={styles.descriptionText}>{labelProp2}</Text>
                    </YStack>
                  <Input
                    value={prop2}
                    onChangeText={(text: string) => {
                      onChangeProp2(text);
                    }}
                    flex={1}
                    size="$3"
                    borderWidth={2}
                    placeholder={`Rol`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                </XStack>
              )}
              {labelProp3 && (
                <XStack
                  gap="$2"
                  width={'100%'}
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginRight: 5 }}>
                  <YStack width={'35%'}>
                    <Text style={styles.descriptionText}>{labelProp3}</Text>
                    </YStack>
                  <Input
                    value={prop3}
                    onChangeText={(text: string) => {
                      onChangeProp3(text);
                    }}
                    flex={1}
                    size="$3"
                    borderWidth={2}
                    placeholder={`Pin`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                </XStack>
              )}
                  </YStack>
                
              </View>
              <Button
                size="$3"
                backgroundColor={'$green10'}
                onPress={onConfirm}>
                OK
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const buttonStyle = StyleSheet.create({
  container: {
    backgroundColor: '#835cf5',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
});
const buttonStyle2 = StyleSheet.create({
  container: {
    backgroundColor: '#a285f3',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris translúcido
  },
  buttonsView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '95%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cantText: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default Dialog;
