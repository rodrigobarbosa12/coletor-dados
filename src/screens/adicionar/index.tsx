import React, {
  useEffect,
  useState,
  ReactElement,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { List, Divider } from 'react-native-paper';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, RouteProp, ParamListBase } from '@react-navigation/native';
import {
  FabScanner,
  ModalAlterarTitulo,
  ModalAlterarItem,
  ItemLista,
} from '../../components';
import styles from './styles';
import {
  colors,
  showErrorForDev,
  alertaRemocaoItem,
  removeListenerNavigation,
} from '../../utils';
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
  const [titulo, setTitulo] = useState<string>(moment().format('YYYYMMDD_Hmmss'));
  const [itens, setItens] = useState<Item[]>([]);
  const [showDialog, setShowDialog] = useState<{[x: string]: boolean}>({});
  const [editarTitulo, setEditarTitulo] = useState<boolean>(false);
  const hasUnsavedChanges = Boolean(itens.length);

  const ultimoItem = itens[0];

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
        await storage.setEstoqueAsync([{ titulo, itens, id: `lista-${moment().format('YYYYMMDD-HHmmss')}` }]);
        navigation.navigate('Home');
        return;
      }

      const listaAtualizada = JSON.parse(listaEstoque);
      listaAtualizada.push({ titulo, itens, id: `lista-${moment().format('YYYYMMDD-HHmmss')}` });
      await storage.setEstoqueAsync(listaAtualizada);
      removeListenerNavigation(navigation);
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

  const alterarCodigoDeBarras = (codigo: string, id: string) => {
    if (!itens) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const itensAtualizado = itens
      .map((i) => (i.id === id ? ({ ...i, codigo }) : i));

    setItens([...itensAtualizado]);
  };

  const alterarNome = (nome: string, id: string) => {
    if (!itens) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const itensAtualizado = itens
      .map((i) => (i.id === id ? ({ ...i, nome }) : i));

    setItens([...itensAtualizado]);
  };

  useEffect(() => {
    if (ultimoItem && ultimoItem?.codigo === params?.itens.codigo) {
      alterarQuantidadePorItem('soma', ultimoItem.id);
      return;
    }

    if (params?.itens) {
      setItens([...itens, params?.itens] || []);
    }
  }, [params?.itens]);

  const save = useCallback(salvarItensPermanente, [itens, navigation, titulo]);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      removeListenerNavigation(navigation);
      return;
    }

    removeListenerNavigation(navigation);
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Atenção',
        'Você não salvou a lista',
        [
          {
            text: 'Sair',
            onPress: () => navigation.dispatch(e.data.action),
          },
          {
            text: 'Continuar na lista',
          },
          {
            text: 'salvar',
            onPress: save,
          },
        ],
      );
    });
  }, [navigation, hasUnsavedChanges, itens, save]);

  return (
    <View style={styles.container}>
      <List.Item
        title={titulo}
        description={!itens.length ? 'NENHUM ITEM CADASTRADO' : getItens(itens.length)}
        right={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setEditarTitulo(true)}>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                color={colors.purple}
                size={30}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {!itens.length ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.infoScanner}>
            Clique no botão de scanner
            {' '}
            <MaterialCommunityIcons name="barcode-scan" color={colors.purple} size={20} />
            {' '}
            para adicionar um item
          </Text>
        </View>
      ) : (
        <ScrollView>
          {itens.reverse().map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => setShowDialog({ [item.id]: true })}
              >
                <ItemLista item={item} />
                <Divider />
              </TouchableOpacity>
              <ModalAlterarItem
                visible={showDialog[item.id]}
                onDismiss={() => setShowDialog({ [item.id]: false })}
                removerItem={removerItem}
                onChangeCodigo={alterarCodigoDeBarras}
                onChangeNome={alterarNome}
                alterarValorInput={alterarValorInput}
                alterarQuantidadePorItem={alterarQuantidadePorItem}
                item={item}
              />
            </View>
          ))}
        </ScrollView>
      )}
      <FabScanner
        salvarItensPermanente={salvarItensPermanente}
        routeName="Adicionar"
      />
      <ModalAlterarTitulo
        visible={editarTitulo}
        setVisible={setEditarTitulo}
        titulo={titulo}
        setTitulo={setTitulo}
      />
    </View>
  );
};

export default Adicionar;
