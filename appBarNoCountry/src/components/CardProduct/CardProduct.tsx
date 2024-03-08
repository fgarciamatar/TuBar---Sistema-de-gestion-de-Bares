import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Product} from '../../interfaces/interface';
import {Button} from 'tamagui';
import {Icon} from '@rneui/themed';
import {ProductData} from '../../screens/Menu/Menu';

interface CardProductProps {
  product: Product;
  handleAdd?: (productId: number) => void;
  handleSubtract?: (productId: number) => void;
  quantity: number;
  havePermision?: boolean;
  handleEditProduct?: (product: ProductData) => void;
  handleShowDeleteProduct?: (id: number) => void;
  icono:string;
}

const CardProduct = ({
  product,
  handleAdd,
  handleSubtract,
  quantity,
  havePermision = false,
  handleEditProduct,
  icono,
  handleShowDeleteProduct,
  
}: CardProductProps) => {
  const {id, name, description, price, productCategoryId} = product;

  const icon1 = { mensaje: require('../../assets/menu/email.png'), remove: require('./../../assets/menu/remove.png') };
  const icon2 = {edit: require('../../assets/menu/pencil.png'), eliminar: require('./../../assets/menu/trash.png')}
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image
        style={styles.imageOrder}
        source={require('../../assets/menu/burguer.png')}
      />
      {havePermision && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            right: 0,
          }}>
          {handleEditProduct && (
            <Button
              size="$1.5"
              chromeless
              onPress={() => {
                handleEditProduct({
                  id,
                  name,
                  description,
                  price,
                  productCategoryId,
                });
              }}>
              <Image
                style={styles.Image}
                source={(icono === "icono1") ? icon1.mensaje : icon2.edit}
              />
            </Button>
          )}
          {handleShowDeleteProduct && (
            <Button
              size="$1.5"
              chromeless
              onPress={() => handleShowDeleteProduct(id)}>
              <Image
                style={(icono === "icono1") ? styles.Image : styles.ImageNeg}
                source={(icono === "icono1") ? icon1.remove : icon2.eliminar}
              />
            </Button>
          )}
        </View>
      )}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.typeFood}>{name}</Text>
          <Text style={styles.category}>{description}</Text>
          <Text style={styles.price}>$ {price}</Text>
        </View>
        <View style={styles.quantity}>
          {handleSubtract && (
            <TouchableOpacity onPress={() => handleSubtract(id)}>
              <Text style={styles.signs}>-</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.showQuantity}>{quantity}</Text>
          {handleAdd && (
            <TouchableOpacity onPress={() => handleAdd(id)}>
              <Text style={styles.signs}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    gap: 5,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
  },
  Image: {
    width: 25,
    height: 25,
  
  },
  ImageNeg:{
    width: 25,
    height: 25,
  tintColor: 'black'
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  typeFood: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  category: {
    fontSize: 13,
  },
  price: {
    color: '#EBB426',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signs: {
    fontSize: 20,
  },
  showQuantity: {
    backgroundColor: '#D7D7D7',
    borderRadius: 8,
    width: 35,
    textAlign: 'center',
  },

  Button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    width: 60,
    height: 30,
    marginTop: 30,
    borderRadius: 5,
  },

  imageOrder: {
    width: 80,
    height: 80,
  },
});
export default CardProduct;
