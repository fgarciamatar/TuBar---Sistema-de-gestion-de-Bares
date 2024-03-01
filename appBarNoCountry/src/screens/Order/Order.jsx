import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../../hooks/hooks";
import { getCategories, getProducts } from '../../redux/actions';

function Order() {
  const dispatch = useDispatch();
  const [tableSeleced, settableSelected] = useState(
    useAppSelector((state) => state.table)
  );
  const navigation = useNavigation();

  const handleMenu = () => {
    navigation.navigate('Menu');
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]); // Dependencia dispatch, para asegurarse de que se ejecute solo una vez
  
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);


  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderBar}>
        <Text style={styles.text}>Mesa {tableSeleced.tableNumber}</Text>

        <TouchableOpacity onPress={handleMenu}>
          <Image
            style={styles.Image}
            source={require('../../assets/add.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.orderText}>
        <Text style={styles.text}>Pedidos</Text>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.orderItem}>
          <Image
            style={styles.imageOrder}
            source={require('../../assets/menu/burguer.png')}
          />
          <View>
            <View>
              <Text style={styles.typeFood}>hamburguer</Text>
              <Text style={styles.category}>papas</Text>
            </View>
            <View>
              <Text style={styles.price}>23.00</Text>
              <Text style={styles.category}>Cantidad: 3</Text>
            </View>
          </View>
        </View>
        
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.total}>
          <Text style={styles.textTotal}>Total: $ --</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    padding: 20,
    flex: 1,
  },
  orderBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#0305C5',
  },
  Image: {
    width: 30,
    height: 30,
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  orderText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  orderItem: {
    borderRadius: 16,
    backgroundColor: 'white',
    width: 250,
    height: 100,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageOrder: {
    width: 80,
    height: 80,
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
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  total: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: 200,
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTotal: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
  },
  textButton: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  sendButton: {
    height: 40,
    width: 85,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    borderRadius: 5,
  },
});

export default Order;