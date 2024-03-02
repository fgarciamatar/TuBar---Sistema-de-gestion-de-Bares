import {useNavigation} from '@react-navigation/native';
import React , {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navbar from '../../components/Navbar/Navbar';
import Tables from '../../components/Tables/Tables';
import { useSelector } from 'react-redux';

function Salon({route}) {
  const mesas = useSelector(state => state.reducers.tables);
  const [mesasOcupadas, setmesasOcupadas] = useState([])
  const [mesasDesocupadas, setmesasDesocupadas] = useState([])

  const {role} = route.params;
console.log("mesas",mesas);
  useEffect(() => {
    if (mesas.tables !== undefined && mesas.tables){
      mesas.tables.map(mesa=>{
        if(mesa.isOccupied){
          mesasOcupadas.push(mesa)
        }else{
          mesasDesocupadas.push(mesa)
        }
       })
    }else{
      setmesasOcupadas([])
      setmesasDesocupadas([])
    }
  }, [mesas])

  return (
    <View style={styles.container}>
      <View>
        <Navbar role={role}/>
      </View>
      <View style={styles.textContainer}>
        <Text>Mesas ocupadas: {mesasOcupadas.length}</Text>
        <Text>Mesas desocupadas: {mesasDesocupadas.length}</Text>
      </View>

      <Tables mesas={mesas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default Salon;
