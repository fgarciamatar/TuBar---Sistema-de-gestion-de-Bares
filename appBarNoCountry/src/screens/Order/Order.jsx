import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from '../../hooks/hooks';
import {getCategories, getProducts} from '../../redux/actions';

function Order() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const {products} = useSelector(state => state.reducers.products);
  const selectedProducts = useSelector(
    state => state.reducers.selectedProducts,
  );

  const [tableSeleced, settableSelected] = useState(
    useAppSelector(state => state.table),
  );
  const [totalCuenta, setTotalCuenta] = useState(0);

  const filteredProducts =
    products &&
    products.filter(product => selectedProducts[product.id.toString()] > 0);
 
    console.log("filteredProducts", filteredProducts);

    

  const handleMenu = () => {
    navigation.navigate('Menu');
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    if (filteredProducts) {
      for (const productId in selectedProducts) {
        const cantidad = selectedProducts[productId];
        if (cantidad > 0) {
          const productoSeleccionado = filteredProducts.find(producto => producto.id === parseInt(productId));
          if (productoSeleccionado) {
            total += productoSeleccionado.price * cantidad;
          }
        }
      }
    }
    setTotalCuenta(total);
  }, [filteredProducts, selectedProducts]);

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

      {filteredProducts && filteredProducts.map((producto, index) => (
        <TouchableOpacity
          key={index}
        >
          <Image
            style={styles.imageOrder}
            source={require('../../assets/menu/burguer.png')}
          />
          <Text style={styles.typeFood}>{producto.name}</Text>
          <Text style={styles.category}>{producto.description}</Text>
          <Text style={styles.price}>${producto.price}</Text>
          <View><Text>cantidad: {selectedProducts[producto.id]}</Text></View>
        </TouchableOpacity>
      ))}

     

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.total}>
          <Text style={styles.textTotal}>Total: ${totalCuenta}</Text>
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
