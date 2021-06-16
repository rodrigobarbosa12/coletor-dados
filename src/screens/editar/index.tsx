import React, { useEffect, useState, ReactElement } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { List, Divider, TextInput } from 'react-native-paper';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, RouteProp, ParamListBase } from '@react-navigation/native';
import FabScanner from '../../components/FabScanner';
import styles from '../adicionar/styles';
import { colors, showErrorForDev, alertaRemocaoItem } from '../../utils';
import ListaEstoque, { Item } from '../../type/ListaEstoque';
import storage from '../../database/localStorage';

type RootStackParamList = {
  Editar: {
    itens: Item,
    lista: ListaEstoque,
   };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Editar'>
}

const Editar = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;
  const [titulo] = useState<string>(moment().format('DD/MM/YYYY H:mm'));
  const [lista, setLista] = useState<ListaEstoque | null>(null);

  const getItens = (quantidade: number): string => (
    quantidade > 1 ? `${quantidade} ITENS` : '1 ITEM'
  );

  const confirmarAlteracoes = async () => {
    try {
      const listas: string | null = await storage.getEstoqueAsync();

      if (!listas) {
        Alert.alert('Atenção', 'Não é possível salvar uma conferência de estoque sem itens.');
        return;
      }

      const listaEstoque: ListaEstoque[] = JSON.parse(listas);

      const estoqueAtualizado = listaEstoque
        .map((item) => (item.id === lista?.id ? lista : item));

      await storage.setEstoqueAsync(estoqueAtualizado);
      navigation.navigate('Itens', { updatePage: moment().format('mmss') });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  const removerItem = async (id: string) => {
    alertaRemocaoItem(async () => {
      if (!lista) {
        Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
        return;
      }

      const itensAtualizado = lista?.itens.filter((item) => item.id !== id);

      setLista({ ...lista, itens: itensAtualizado });
    });
  };

  const somar = (i: Item, id: string) => (
    i.id === id ? ({ ...i, quantidade: i.quantidade + 1 }) : i
  );

  const subtrair = (i: Item, id: string) => (
    i.id === id ? ({ ...i, quantidade: i.quantidade - 1 }) : i
  );

  const alterarQuantidadePorItem = async (operador: string, id: string) => {
    if (!lista) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const { itens } = lista;

    const itensAtualizado = operador === 'soma'
      ? itens.map((i) => somar(i, id))
      : itens.map((i) => subtrair(i, id));

    setLista({ ...lista, itens: itensAtualizado });
  };

  const alterarValorInput = (value: number, id: string) => {
    if (!lista) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const { itens } = lista;

    const itensAtualizado = itens
      .map((i) => (i.id === id ? ({ ...i, quantidade: value }) : i));

    setLista({ ...lista, itens: itensAtualizado });
  };

  const incluirItemNaLista = (item: Item) => {
    if (lista) {
      const { itens } = lista;

      const listaAtualizada = { ...lista, itens: [...itens, item] };

      setLista(listaAtualizada);
    }
  };

  useEffect(() => {
    setLista(params?.lista);
  }, [params?.lista]);

  useEffect(() => {
    if (params?.itens) {
      incluirItemNaLista(params?.itens);
    }
  }, [params?.itens]);

  return (
    <View style={styles.container}>
      <List.Item
        title={titulo}
        description={!lista?.itens.length ? 'NENHUM ITEM CADASTRADO' : getItens(lista.itens.length)}
      />
      <ScrollView>
        {lista?.itens.map((item) => (
          <View key={item.id}>
            <List.Item
              title={<Text>{item.codigo}</Text>}
              titleStyle={{ maxWidth: '80%' }}
              right={() => (
                <View style={styles.center}>
                  <View style={{ ...styles.center, right: '20%' }}>
                    <TouchableOpacity
                      onPress={() => alterarQuantidadePorItem('sub', item.id)}
                    >
                      <MaterialCommunityIcons name="minus-circle" color={colors.danger} size={30} />
                    </TouchableOpacity>
                    <View style={styles.viewInput}>
                      <TextInput
                        value={String(item.quantidade)}
                        keyboardType="numeric"
                        mode="outlined"
                        outlineColor="transparent"
                        multiline
                        style={styles.input}
                        dense
                        onChangeText={(total) => {
                          alterarValorInput(Number(total), item.id);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => alterarQuantidadePorItem('soma', item.id)}
                    >
                      <MaterialCommunityIcons name="plus-circle" color={colors.success} size={30} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removerItem(item.id)}>
                    <MaterialCommunityIcons name="trash-can-outline" color={colors.grey} size={30} />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Divider />
          </View>
        ))}
      </ScrollView>
      <FabScanner
        salvarItensPermanente={confirmarAlteracoes}
        routeName="Editar"
      />
    </View>
  );
};

export default Editar;
