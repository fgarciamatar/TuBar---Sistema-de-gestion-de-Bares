import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Product, ProductQuantity} from '../../interfaces/interface';

interface CardProductProps {
  product: Product;
  handleAdd?: (productId: number) => void;
  handleSubtract?: (productId: number) => void;
  quantity: number;
}

const CardProduct = ({
  product,
  handleAdd,
  handleSubtract,
  quantity,
}: CardProductProps) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image
        style={styles.imageOrder}
        source={require('../../assets/menu/burguer.png')}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.typeFood}>{product.name}</Text>
          <Text style={styles.category}>{product.description}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
        </View>
        <View style={styles.quantity}>
          {handleSubtract && (
            <TouchableOpacity onPress={() => handleSubtract(product.id)}>
              <Text style={styles.signs}>-</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.showQuantity}>{quantity}</Text>
          {handleAdd && (
            <TouchableOpacity onPress={() => handleAdd(product.id)}>
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
