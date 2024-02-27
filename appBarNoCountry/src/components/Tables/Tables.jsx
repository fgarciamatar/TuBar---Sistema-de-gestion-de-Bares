import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Spinner} from 'tamagui';
import {useAppDispatch} from '../../hooks/hooks';
import {table, tableSet} from '../../reducers/tableReducer';

function Tables({mesas}) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSend = mesa => {
    let item = {
      ability: mesa.ability,
      barId: mesa.barId,
      id: mesa.id,
      isOccupied: mesa.isOccupied,
      location: mesa.location,
      tableNumber: mesa.tableNumber,
    };
    dispatch(tableSet(item));
    navigation.navigate('Order');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tablesContainer}>
        {mesas.tables !== undefined && mesas.tables ? (
          mesas?.tables.map((table, index) => (
            <TouchableOpacity
              key={table.id}
              style={[
                styles.table,
                {backgroundColor: table.isOccupied ? 'red' : 'green'},
              ]}
              onPress={()=>{handleSend(table)}}>
              <Text style={styles.tableText}>{table.tableNumber}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Spinner size="large" color="$orange10" />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  tablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  table: {
    width: '30%', // Ajusta el tamaño para que entren tres mesas por fila
    aspectRatio: 1, // Hace que el elemento sea cuadrado
    backgroundColor: 'white', // Cambiado a fondo blanco
    borderWidth: 2, // Ancho del borde
    borderColor: 'black', // Color del borde
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Centra el contenido horizontalmente
    justifyContent: 'center', // Centra el contenido verticalmente
    marginVertical: 10, // Espacio vertical entre mesas
  },
  tableText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Tables;
