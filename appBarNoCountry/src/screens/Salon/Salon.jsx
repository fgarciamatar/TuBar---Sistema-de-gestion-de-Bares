import {useNavigation} from '@react-navigation/native';
import React , {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Navbar from '../../components/Navbar/Navbar';
import Tables from '../../components/Tables/Tables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '../../components/Dialog/Dialog';
import { getTables } from '../../redux/actions';
import {createTables, deleteTables} from '../../apis';

function Salon() {
  const mesas = useSelector(state => state.reducers.tables);
  const [mesasOcupadas, setmesasOcupadas] = useState([])
  const [mesasDesocupadas, setmesasDesocupadas] = useState([])
  const [rol, setrol] = useState('waitress')
  const [open, setOpen] = useState(false);
  const [openEdit, setopenEdit] = useState(false)
  const [count, setCount] = useState(0);
  const [tableLength, settableLength] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    setCount(0)
    let ocupadas=[];
    let desocupadas=[];
    if (mesas.tables !== undefined && mesas.tables){
      loadRole()
      mesas.tables.map(mesa=>{
        if(mesa.isOccupied){
          ocupadas.push(mesa)
        }else{
          desocupadas.push(mesa)
        }
        
       })
       console.log('OCUPADAS', ocupadas, 'DESOCUPADAS', desocupadas)
       setmesasOcupadas(ocupadas)
       setmesasDesocupadas(desocupadas) 
       settableLength(mesas.tables.length)
    }else{
      setmesasOcupadas([])
      setmesasDesocupadas([])
    }
  }, [mesas])

  const loadRole = async ()=>{
    let role= await AsyncStorage.getItem('role')
    console.log('ROL ADMIN?', role)
    setrol( role )
  }

  const handleOpenDialog = () => {
    setOpen(!open);
    setCount(0)
  };

  const handleOpenEditDialog = () => {
    setopenEdit(!openEdit);
    settableLength(mesas.tables.length)
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    console.log('ACTUAL COUNT',count)
    if (count > 0) {
      console.log('ENTRE A COUNT > 0')
      setCount(count - 1);
    }else{
      console.log('ENTRE A COUNT NORMAL')
      setCount(0)
    }
  };

  const handleConfirmAdd = () => {
    Alert.alert(
      'Confirmar Agregar',
      `¿Estas Seguro que deseas agregar ${count} mesa${count==1?'?':'s?'}`,
      [
        {
          text: 'SI',
          onPress: handleAddTables,
        },
        {
          text: 'NO',
          onPress: ()=>{},
        },
      ],
    );
  };

  const handleAddTables = async () => {
    const tablesCreated = await createTables(count);
    if (tablesCreated.status) {
      Alert.alert('Exito', 'Mesas Creadas');
      dispatch(getTables());
      setOpen(!open);
      setCount(0)
    } else if (!tablesCreated.status) {
      Alert.alert('Error', 'No se Crearon Mesas.');

    }
    
  };

  const handleConfirmEdit = () => {
    Alert.alert(
      'Confirmar Editar',
      'El salon ahora tendra '+tableLength+' mesas en total',
      [
        {
          text: 'SI',
          onPress: handleEditTables,
        },
        {
          text: 'NO',
          onPress: ()=>{},
        },
      ],
    );
  };

  const handleEditTables = async () => {
    if (mesas.tables !== undefined && mesas.tables){
    let eliminarMesas = mesas.tables.length - tableLength;
    let cantidad = Math.min(eliminarMesas, mesas.tables.length);
    let finish= false
    console.log('CANTIDAD', cantidad, eliminarMesas)
    if (tableLength > mesas.tables.length) {

      let mesasAgregar = tableLength - mesas.tables.length
      console.log('MESAS AGREGAR', mesasAgregar)
      const tablesCreated = await createTables(mesasAgregar);
    if (tablesCreated.status) {
      Alert.alert('Exito', 'Mesas Creadas');
      dispatch(getTables());
      handleOpenEditDialog()
    } else if (!tablesCreated.status) {
      Alert.alert('Error', 'No se Crearon Mesas.');

    }
    }else{
      for (let i = mesas.tables.length - 1; i >= mesas.tables.length - cantidad; i--) {
        const id = mesas.tables[i].id; 
        const tablesDeleted = await deleteTables(id);
          finish=tablesDeleted.status
  
  
       console.log('ID', id, tablesDeleted)
      }
      if (finish) {
        Alert.alert('Exito', 'Mesas Creadas');
        dispatch(getTables());
        handleOpenEditDialog()
      } else if (!finish) {
        Alert.alert('Error', 'No se Crearon Mesas.');
  
      }
    }
    
  }else{
    console.log('MESAS UNDEFINED', mesas.tables)
  }
    
  };


  return (
    <View style={styles.container}>
      <View>
        <Navbar role={rol} onPressAdd={handleOpenDialog} onPressEdit={handleOpenEditDialog}/>
      </View>
      <View style={styles.textContainer}>
        <Text>Mesas ocupadas: {mesasOcupadas.length}</Text>
        <Text>Mesas desocupadas: {mesasDesocupadas.length}</Text>
      </View>

      <Tables mesas={mesas} />
      <Dialog
        isVisible={open}
        isCount={count}
        isEdit={false}
        countTables={mesas.tables !== undefined && mesas.tables.length ? mesas.tables.length : 0}
        onHidePress={handleOpenDialog}
        title={"# Mesas Actual: " }
        description={"¿Cuantas mesas deseas agregar?"}
        onAdd={handleIncrement}
        onRemove={handleDecrement}
        onConfirm={handleConfirmAdd}
      />
      <Dialog
        isVisible={openEdit}
        editTables={tableLength}
        onEditTables={settableLength}
        isEdit={true}
        countTables={mesas.tables !== undefined && mesas.tables.length ? mesas.tables.length : 0}
        onHidePress={handleOpenEditDialog}
        title={"# Mesas Actual: " }
        description={"¿Cuantas mesas tienes actualmente?"}
        onConfirm={handleConfirmEdit}
      />
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
