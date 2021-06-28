import React, {
  useEffect,
  useState,
  useCallback,
  ReactElement,
} from 'react';
import {
  View,
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
import styles from '../adicionar/styles';
import {
  colors,
  showErrorForDev,
  alertaRemocaoItem,
  removeListenerNavigation,
} from '../../utils';
import ListaEstoque, { Item } from '../../type/ListaEstoque';
import storage from '../../database/localStorage';

type RootStackParamList = {
  Editar: {
    itens: Item,
    lista: ListaEstoque,
    routeName: string,
   };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Editar'>
}

const Editar = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;
  const [titulo, setTitulo] = useState<string>(moment().format('YYYYMMDD_Hmmss'));
  const [lista, setLista] = useState<ListaEstoque | null>(null);
  const [showDialog, setShowDialog] = useState<{[x: string]: boolean}>({});
  const [editarTitulo, setEditarTitulo] = useState<boolean>(false);
  const hasUnsavedChanges = Boolean(lista);

  const ultimoItem = lista?.itens[0];

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
        .map((item) => (item.id === lista?.id ? { ...lista, titulo } : item));

      await storage.setEstoqueAsync(estoqueAtualizado);
      removeListenerNavigation(navigation);
      navigation.navigate(params.routeName, { updatePage: moment().format('mmss') });
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
    if (ultimoItem?.codigo === item.codigo) {
      alterarQuantidadePorItem('soma', ultimoItem.id);
      return;
    }

    if (lista) {
      const { itens } = lista;

      const listaAtualizada = { ...lista, itens: [...itens, item] };

      setLista(listaAtualizada);
    }
  };

  const alterarCodigoDeBarras = (codigo: string, id: string) => {
    if (!lista) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const { itens } = lista;

    const itensAtualizado = itens
      .map((i) => (i.id === id ? ({ ...i, codigo }) : i));

    setLista({ ...lista, itens: itensAtualizado });
  };

  const alterarNome = (nome: string, id: string) => {
    if (!lista) {
      Alert.alert('Algo deu errado', 'Tente novamente mais tarde.');
      return;
    }

    const { itens } = lista;

    const itensAtualizado = itens
      .map((i) => (i.id === id ? ({ ...i, nome }) : i));

    setLista({ ...lista, itens: itensAtualizado });
  };

  useEffect(() => {
    setLista(params?.lista);
    setTitulo(params?.lista.titulo);
  }, [params?.lista]);

  useEffect(() => {
    if (params?.itens) {
      incluirItemNaLista(params?.itens);
    }
  }, [params?.itens]);

  const save = useCallback(confirmarAlteracoes, [lista, navigation, titulo]);

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
  }, [navigation, hasUnsavedChanges, lista, save]);

  return (
    <View style={styles.container}>
      <List.Item
        title={titulo}
        description={!lista?.itens.length ? 'NENHUM ITEM CADASTRADO' : getItens(lista.itens.length)}
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
      <ScrollView>
        {lista?.itens.reverse().map((item) => (
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
      <FabScanner
        salvarItensPermanente={confirmarAlteracoes}
        routeName="Editar"
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

export default Editar;
