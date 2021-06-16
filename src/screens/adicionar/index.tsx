import React, { useEffect, useState, ReactElement } from 'react';
import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { List, Divider, TextInput } from 'react-native-paper';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, RouteProp, ParamListBase } from '@react-navigation/native';
import FabScanner from '../../components/FabScanner';
import styles from './styles';
import { colors, showErrorForDev, alertaRemocaoItem } from '../../utils';
import { Item } from '../../type/ListaEstoque';
import storage from '../../database/localStorage';

type RootStackParamList = {
  Adicionar: { itens: Item };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Adicionar'>
}

const Adicionar = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;
  const [titulo] = useState<string>(moment().format('DD/MM/YYYY H:mm'));
  const [itens, setItens] = useState<Item[]>([]);

  const getItens = (quantidade: number): string => (
    quantidade > 1 ? `${quantidade} ITENS` : '1 ITEM'
  );

  const salvarItensPermanente = async () => {
    try {
      if (!itens.length) {
        Alert.alert('Atenção', 'Não é possível salvar uma conferência de estoque sem itens.');
        return;
      }

      const listaEstoque = await storage.getEstoqueAsync();

      if (!listaEstoque) {
        await storage.setEstoqueAsync([{ titulo, itens, id: moment().format('Hmmss') }]);
        navigation.navigate('Home');
        return;
      }

      const listaAtualizada = JSON.parse(listaEstoque);
      listaAtualizada.push({ titulo, itens, id: moment().format('Hmmss') });
      storage.setEstoqueAsync(listaAtualizada);
      navigation.navigate('Home');
    } catch (error) {
      showErrorForDev(error);
    }
  };

  const removerItem = async (id: string) => {
    alertaRemocaoItem(async () => {
      if (!itens) {
        Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
        return;
      }

      const itensAtualizado = itens.filter((item) => item.id !== id);

      setItens([...itensAtualizado]);
    });
  };

  const somar = (i: Item, id: string) => (
    i.id === id ? ({ ...i, quantidade: i.quantidade + 1 }) : i
  );

  const subtrair = (i: Item, id: string) => (
    i.id === id ? ({ ...i, quantidade: i.quantidade - 1 }) : i
  );

  const alterarQuantidadePorItem = async (operador: string, id: string) => {
    if (!itens) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const itensAtualizado = operador === 'soma'
      ? itens.map((i) => somar(i, id))
      : itens.map((i) => subtrair(i, id));

    setItens([...itensAtualizado]);
  };

  const alterarValorInput = (value: number, id: string) => {
    if (!itens) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const itensAtualizado = itens
      .map((i) => (i.id === id ? ({ ...i, quantidade: value }) : i));

    setItens([...itensAtualizado]);
  };

  useEffect(() => {
    if (params?.itens) {
      setItens([...itens, params?.itens] || []);
    }
  }, [params?.itens]);

  return (
    <View style={styles.container}>
      <List.Item
        title={titulo}
        description={!itens.length ? 'NENHUM ITEM CADASTRADO' : getItens(itens.length)}
      />
      <ScrollView>
        {itens.map((item) => (
          <View key={item.id}>
            <List.Item
              title={item.codigo}
              right={() => (
                <View style={styles.center}>
                  <View style={{ ...styles.center, right: '20%' }}>
                    <TouchableOpacity
                      onPress={() => {
                        alterarQuantidadePorItem('sub', item.id);
                      }}
                    >
                      <MaterialCommunityIcons name="minus-circle" color={colors.danger} size={30} />
                    </TouchableOpacity>
                    <TextInput
                      value={String(item.quantidade)}
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={(total) => {
                        alterarValorInput(Number(total), item.id);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        alterarQuantidadePorItem('soma', item.id);
                      }}
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
        salvarItensPermanente={salvarItensPermanente}
        routeName="Adicionar"
      />
    </View>
  );
};

export default Adicionar;
