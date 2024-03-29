import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {API_JSON, API_URL} from '../../../config/api/general';
import {PhotosInterface} from './interfaces/Photos.interface,';
import {FlatList} from 'react-native-gesture-handler';
import {LoadingScreen} from '../loading/LoadingScreen';
import {FlatGrid} from 'react-native-super-grid';

export const TablaScreen = () => {
  const [tableHead, setTableHead] = useState([
    'Head',
    'Head2',
    'Head3',
    'Head4',
  ]);
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState<PhotosInterface[]>();
  const [tableRow, setTableRow] = useState([
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c'],
  ]);

  const getData = async () => {
    setIsloading(true);
    const data = await API_JSON.get<PhotosInterface[]>('/photos');

    const copyProdunda: PhotosInterface[] = JSON.parse(
      JSON.stringify(data.data),
    );
    setData(copyProdunda);

    const encabezados = Object.keys(copyProdunda[0]).filter(
      value => value != 'albumId' && value != 'thumbnailUrl',
    );
    encabezados.push('Acciones');
    encabezados.push('');
    setTableHead(encabezados);

    const tableRow: any[][] = data.data.map(values => {
      const valores = Object.values(values);

      const nuevosValores = valores.map(valor => valor.toString());
      // console.log("nuevosValores" ,nuevosValores)
      return nuevosValores;
    });

    // const ultimaPrueba = tableRow.join(' ')

    setTableRow([tableRow[0], tableRow[1], tableRow[2], tableRow[3]]);

    console.log(...tableRow[0]);
    setIsloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableRow} textStyle={styles.text}/>
          
        </Table>
      <FlatGrid
        itemDimension={130}
        data={data}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({item}) => (
          <View style={[styles.itemContainer]}>
            <Text style={{color: 'black'}}>{item.albumId}</Text>
            <Text style={{color: 'black'}}>{item.title}</Text>
            <Text style={{color: 'black'}}>{item.url}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: 'black'},
  gridView: {
    marginTop: 10,
    flex: 1,
    flexDirection:'column'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 150,
    borderWidth: 1
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#black',
  },
});
