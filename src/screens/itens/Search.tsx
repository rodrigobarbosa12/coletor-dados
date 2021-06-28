import React, { useEffect, useState, ReactElement } from 'react';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, List, Drawer } from 'react-native-paper';
import { colors, showErrorForDev } from '../../utils';
import storage from '../../database/localStorage';
import ListaEstoque from '../../type/ListaEstoque';
import styles from './styles';

type RootStackParamList = {
  Itens: { updatePage: string };
};

interface Props {
    navigation: NavigationProp<ParamListBase>,
    route: RouteProp<RootStackParamList, 'Itens'>
}

const Search = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;

  const [estoque, setEstoque] = useState<ListaEstoque[]>([]);
  const [locais, setLocais] = useState<ListaEstoque[]>([]);
  const [valueSearch, setValueSearch] = useState<string>('');

  const listarItensPermanente = async () => {
    try {
      const lista = await storage.getEstoqueAsync();

      if (lista) {
        const listaEstoque: ListaEstoque[] = JSON.parse(lista);

        const listaOrdenada = listaEstoque
          .sort((a, b) => (a.id < b.id ? 1 : -1));

        setEstoque(listaOrdenada);
      }
    } catch (error) {
      showErrorForDev(error);
    }
  };

  const searchItem = (value: string) => {
    setValueSearch(value);
    setLocais(estoque
      .filter((lista) => {
        if (
          lista.itens.filter((item) => item.nome
            .toLowerCase()
            .includes(value.toLowerCase()))
            .length
        ) {
          return lista;
        }
        return null;
      }));
  };

  const editarLista = async (lista: ListaEstoque) => {
    try {
      navigation.navigate('Editar', { lista, titulo: lista.titulo, routeName: 'Search' });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  useEffect(() => {
    listarItensPermanente();
  }, []);

  useEffect(() => {
    setValueSearch('');
    listarItensPermanente();
  }, [params?.updatePage]);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ backgroundColor: 'transparent' }}
        autoCorrect={false}
        label="Pesquisa"
        right={<TextInput.Icon name="magnify" />}
        value={valueSearch}
        onChangeText={searchItem}
      />
      <List.Section>
        {locais.length ? (
          <List.Subheader>Local</List.Subheader>
        ) : null}
        {valueSearch && locais.length ? (
          <FlatList
            data={locais}
            initialNumToRender={0}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => editarLista(item)}>
                <Drawer.Item
                  key={item.id}
                  style={{ backgroundColor: '#8257e5', padding: 8 }}
                  label=""
                  icon={() => (
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                      {item.titulo}
                    </Text>
                  )}
                  right={() => <MaterialCommunityIcons name="arrow-right" color={colors.white} size={20} />}
                />
              </TouchableOpacity>
            )}
          />
        ) : null}
      </List.Section>
    </View>
  );
};

export default Search;
