import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {Icon, ListItem, Avatar} from '@rneui/themed';
import {Button, XGroup, XStack, YStack} from 'tamagui';
import {selectedProducts} from './../../redux/actions';

function Menu() {
  const selecProductGlobal = useSelector(
    state => state.reducers.selectedProducts,
  );
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.reducers.categories);
  const {products} = useSelector(state => state.reducers.products);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQuantity] = useState(selecProductGlobal);
  const [role, setRole] = useState('');
  const navigation = useNavigation();

  const handleCategoryClick = id => {
    setSelectedCategory(id);
    // console.log("iDFILTER",id);
  };

  const filteredProducts =
    products &&
    products.filter(product => product.productCategoryId === selectedCategory);

  const handleAdd = productId => {
    setQuantity(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] || 0) + 1,
    }));
  };

  const handleSubtract = productId => {
    if (quantity[productId] > 0) {
      setQuantity(prevState => ({
        ...prevState,
        [productId]: prevState[productId] - 1,
      }));
    }
  };

  const handleDelete = productId => {
    if (quantity[productId] > 0) {
      setQuantity(prevState => ({
        ...prevState,
        [productId]: 0,
      }));
    }
  };

  const handleOrder = () => {
    dispatch(selectedProducts(quantity));
    navigation.navigate('Order');
  };
  //  console.log("menu", selecProductGlobal);

  useEffect(() => {
    // Función asincrónica para obtener el rol de usuario desde AsyncStorage
    const getRole = async () => {
      try {
        const roleAsync = await AsyncStorage.getItem('role');
        setRole(roleAsync); // Actualiza el estado con el rol de usuario obtenido
      } catch (error) {
        console.log('Error al obtener el rol del usuario:', error);
      }
    };
    getRole(); // Llama a la función para obtener el rol de usuario al cargar el componente
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente

  return (
    <View style={styles.menuContainer}>
      <ScrollView style={styles.foodContainer} horizontal={true}>
        {role === 'ADMIN' ? (
          <XStack
            gap="$1"
            justifyContent="center"
            style={{
              marginRight: 5,
              backgroundColor: '#8586FF',
              borderRadius: 16,
              padding: 10,
            }}>
            <Button size="$3" chromeless>
              <Icon name="add-circle" color={'green'} />
            </Button>
          </XStack>
        ) : null}
        {categories &&
          categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.foodItem,
                index === category.name.length - 1 ? {marginRight: 60} : null,
              ]}
              onPress={() => handleCategoryClick(category.id)}>
              <Text style={styles.foodName}>{category.name}</Text>
              {role === 'ADMIN' ? (
                <XStack
                  gap="$1"
                  justifyContent="center"
                  style={{marginRight: 5}}>
                  <Button size="$3" chromeless>
                    <Icon name="edit" />
                  </Button>
                </XStack>
              ) : null}
            </TouchableOpacity>
          ))}
      </ScrollView>

      <ScrollView style={styles.menuItemContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.orderItem}>
            {filteredProducts &&
              filteredProducts.map((producto, index) => (
                <TouchableOpacity
                  key={index}
                  // onPress={() => handleCategoryClick(category.name)}
                >
                  <Image
                    style={styles.imageOrder}
                    source={require('../../assets/menu/burguer.png')}
                  />
                  {role === 'ADMIN' ? (
                    <XStack
                      gap="$1"
                      justifyContent="center"
                      style={{marginRight: 5}}>
                      <Button size="$3" chromeless>
                        <Icon name="add-circle" color={'green'} />
                      </Button>
                      <Button size="$3" chromeless>
                        <Icon name="edit" />
                      </Button>
                    </XStack>
                  ) : null}
                  <Text style={styles.typeFood}>{producto.name}</Text>
                  <Text style={styles.category}>{producto.description}</Text>
                  <Text style={styles.price}>{producto.price}</Text>
                  <View style={styles.quantity}>
                    <TouchableOpacity
                      onPress={() => handleSubtract(producto.id)}>
                      <Text style={styles.signs}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.showQuantity}>
                      {quantity[producto.id] || 0}
                    </Text>
                    <TouchableOpacity onPress={() => handleAdd(producto.id)}>
                      <Text style={styles.signs}>+</Text>
                    </TouchableOpacity>
                    {quantity[producto.id] > 0 && (
                      <TouchableOpacity
                        onPress={() => handleDelete(producto.id)}>
                        <Text style={styles.signs}>Delete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity onPress={handleOrder} style={styles.Button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    width: 'auto',
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
  foodItem: {
    backgroundColor: '#8586FF',
    borderRadius: 16,
    padding: 10,
    marginLeft: 10,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3032FC',
  },
  foodName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuItemContainer: {
    padding: 10,
  },
  menuItem: {
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
  images: {
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
    flex: 1,
    position: 'absolute',
    top: 600,
    width: '100%',
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
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  imageOrder: {
    width: 80,
    height: 80,
  },
});

export default Menu;
