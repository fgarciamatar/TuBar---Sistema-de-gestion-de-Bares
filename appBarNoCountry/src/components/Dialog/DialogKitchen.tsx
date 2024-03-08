import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, XStack, Input} from 'tamagui';

interface DialogProps {
  isVisible: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isVisible,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{title}</Text>
              <Text style={styles.descriptionText}>{description}</Text>
              <View style={styles.buttonsView}>
                <Button
                  size="$3"
                  backgroundColor={'$green10'}
                  onPress={onConfirm}
                  style={buttonStyle.container}>
                  Aceptar
                </Button>
                <Button
                  size="$3"
                  backgroundColor={'$green10'}
                  onPress={onCancel}
                  style={buttonStyle2.container}>
                  Cancelar
                </Button>
              </View>
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
    marginHorizontal: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Dialog;
