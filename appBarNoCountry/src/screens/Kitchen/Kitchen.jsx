import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Spinner } from 'tamagui';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import axiosInstance from '../../services/axiosInstance';
import { urlApi } from '../../utils/definition';
import DialogKitchen from '../../components/Dialog/DialogKitchen'; // Importa el componente Dialog aquí
import {apiCrea} from '../../apis';
import { getOrders } from '../../redux/actions';



function Kitchen() {
  const [foods, setFoods] = useState(undefined);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const [reversedFoods, setReversedFoods] = useState([]); // Estado para almacenar el array invertido

  useEffect(() => {
    const getBillOrder = async () => {
      try {
        const res = await axiosInstance.get(`${urlApi}/bill-orders`);
       const filteredFoods = res.data.billOrders.filter(item => !item.isBilled);
        setFoods(filteredFoods);
        setReversedFoods(filteredFoods.reverse()); // Invertir y almacenar en el estado separado
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    }

    getBillOrder();
  }, []);

  const handleShowDialog = (item) => {
    setOrderNumber(item.billOrderNumber[5] + item.billOrderNumber[6]);
    setSelectedItem(item);
    setIsDialogVisible(true);
  };

  const handleHideDialog = () => {
    setIsDialogVisible(false);
  };

  const handleConfirmDialog = () => {
    axiosInstance.patch(`${urlApi}/bill-orders/${selectedItem.id}/pay`)
      .then(res => {
        getBillOrder(); // Actualiza los datos después de pagar la orden
        handleHideDialog(); // Oculta el diálogo
      })
      .catch(error => {
        console.error('Error al pagar la orden:', error);
        handleHideDialog();
      });
  };

  const handleCancelDialog = () => {
    handleHideDialog();
  };

  return (
    <View>{console.log('hola')}
      <View style={styles.menuContainer}>
        {foods !== undefined && foods ? (
          <FlatList
            style
            data={reversedFoods}
            keyExtractor={(item) => item.billOrderNumber.toString()} // Utiliza billOrderNumber como clave única
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.foodItem}
                onPress={() => handleShowDialog(item)} // Corrección aquí
>
                {item.orderDetails.map((orderDetail, index) => (
                  <View key={index} style={styles.last1}>
                    <View style={styles.productContainer}>
                    <Text style={styles.foodName}>
                      {orderDetail.product.description}
                    </Text>
                    <Text >
                        {orderDetail.quantity //.description === orderDetail.product.description).length)}
                        }</Text>
                    </View>
                    {orderDetail.description && (
                      <Text style={styles.description}>
                        {orderDetail.description}
                      </Text>
                    )}
                  </View>
                ))}
                <Text style={styles.orderNumber}>{item.billOrderNumber[5] + item.billOrderNumber[6]}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Spinner size="large" color="$orange10" />
        )}
      </View>
      <View>
        {/* Renderizar el diálogo */}
        <DialogKitchen
          isVisible={isDialogVisible}
          title={`en la mesa ${orderNumber}`}
          description="Esta usted seguro que esta preparado?"
          onHidePress={handleHideDialog}
          onConfirm={handleConfirmDialog}
          onCancel={handleCancelDialog}
        />
      </View>
    </View>
  );
}

export default Kitchen;

const styles = StyleSheet.create({
      menuContainer: {
        display: 'flex',
        backgroundColor: '#EEEBEB',
        borderWidth: 1,
        width: '100%',
        height: 'auto' // Cambiar de '100%' a 'auto'
      },

foodItem: {
  backgroundColor: '#8586FF',
  borderRadius: 10,
  marginVertical: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderWidth: 1.5,
  borderColor: '#3032FC',
  width: '100%', // Ocupa todo el ancho disponible
  flexGrow: 0, // Evita la expansión vertical
},
  last1: {
          borderBottomColor:'#3032FC',
        borderBottomWidth:1,
    marginHorizontal:5

  },
  productContainer:{
  flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
            paddingTop: 3,
  },

  orderNumber: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        width:'100%',
        textAlign:'center',
        marginTop:6,
        marginBottom:-6,
  },
          
      foodName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,

        width: 'auto',
      },
      description: {
        color: '#000',
        backgroundColor:'#CCC',
        fontWeight: 'bold',
        fontSize: 20,
        width: 'auto',
        paddingHorizontal:10,
    marginBottom:5,
      },
      category: {
        fontSize: 13,
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
      fixedButtonContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        marginHorizontal: 20,
        alignItems: 'center',
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
        position: 'absolute', 
        bottom: 0,
      },
      buttonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
      },
})

