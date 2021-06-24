import React, { useEffect, useState, ReactElement } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, List, Drawer } from 'react-native-paper';
import { colors, showErrorForDev } from '../../utils';
import storage from '../../database/localStorage';
import ListaEstoque from '../../type/ListaEstoque';
import styles from './styles';

interface Props {
    navigation: NavigationProp<ParamListBase>
}

const Search = ({ navigation }: Props): ReactElement => {
  const [estoque, setEstoque] = useState<ListaEstoque[]>([]);
  const [locais, setLocais] = useState<ListaEstoque[]>([]);

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
    setLocais(estoque
      .filter((lista) => {
        if (lista.itens.filter((item) => item.codigo === value).length) {
          return lista;
        }
        return null;
      }));
  };

  useEffect(() => {
    listarItensPermanente();
  }, []);

  console.warn();

  return (
    <View style={styles.container}>
      <TextInput
        style={{ backgroundColor: 'transparent' }}
        label="Pesquisa"
        right={<TextInput.Icon name="magnify" />}
        onChangeText={searchItem}
      />
      <List.Section>
        <List.Subheader>Local</List.Subheader>
        {locais.length ? locais.map((local) => (
          <Drawer.Item
            key={local.id}
            style={{ backgroundColor: '#8257e5', padding: 8 }}
            label=""
            icon={() => (
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                {local.titulo}
              </Text>
            )}
            right={() => <MaterialCommunityIcons name="arrow-right" color={colors.white} size={20} />}
          />
        )) : null}
      </List.Section>
    </View>
  );
};

export default Search;
