import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {View} from 'tamagui';
import axiosInstance from '../../services/axiosInstance';
import { useEffect } from 'react';
function Kitchen() {
  const categories = useSelector(state => state.reducers.categories);
  const [foods, setFoods] = useState([]);

  const getBillOrder = async () => {
    axiosInstance
      .get(`/bill-orders`)
      .then(res => console.log(res.data));
  };



  useEffect(() => {
    console.log("hola");
    // setFoods(getBillOrder())
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={categories}
          renderItem={({item: category}) => (
            <TouchableOpacity
              style={styles.foodItem}
            //   onPress={() => selectProducts(category.products)}>
            onPress={() =>console.log("hola")}>
              <Text style={styles.foodName}>{category.name}</Text>
            </TouchableOpacity>
          )}
          horizontal={true}
          keyExtractor={item => item.id}
        />
      </View>
      <View>

      </View>
    </View>
  );
}
export default Kitchen;

const styles = StyleSheet.create({
    menuContainer: {
        padding: 20,
        gap: 10,
        flex: 1
      },
    
      foodItem: {
        backgroundColor: '#8586FF',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderWidth: 1.5,
        borderColor: '#3032FC',
      },
    
      foodName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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

