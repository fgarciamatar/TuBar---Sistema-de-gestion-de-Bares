import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';


function Menu() {
  const {categories} = useSelector(state => state.reducers.categories);
  const {products} = useSelector(state => state.reducers.products);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation();

  const incrementCounter = foodItem => {
    const newFood = food.map(item =>
      item === foodItem ? {...item, quantity: item.quantity + 1} : item,
    );
    setFood(newFood);
  };

  const decrementCounter = foodItem => {
    const newFood = food.map(item =>
      item === foodItem && item.quantity > 0
        ? {...item, quantity: item.quantity - 1}
        : item,
    );
    setFood(newFood);
  };
  
  const handleCategoryClick = (id) => {
    // setSelectedType(type);
    setSelectedCategory(id);
    // console.log("iDFILTER",id);
  }
  
  const filteredProducts = products.filter(
    product => product.productCategoryId === selectedCategory
  );
  


  const handleOrder = () => {
    navigation.navigate('Order');
  };
 
  return (
    <View style={styles.menuContainer}>
      <ScrollView style={styles.foodContainer} horizontal={true}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.foodItem,
              index === category.name.length - 1 ? {marginRight: 60} : null,
            ]}
            onPress={() => handleCategoryClick(category.id)}>
            <Text style={styles.foodName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.menuItemContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.orderItem}>
            {filteredProducts.map((producto, index) => (
              <TouchableOpacity
                key={index}
                // onPress={() => handleCategoryClick(category.name)}
              >
                <Image
                  style={styles.imageOrder}
                  source={require('../../assets/menu/burguer.png')}
                />
                <Text style={styles.typeFood}>{producto.name}</Text>
                <Text style={styles.category}>{producto.description}</Text>
                <Text style={styles.price}>{producto.price}</Text>
                <Text style={styles.category}>Cantidad: 3</Text>
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
