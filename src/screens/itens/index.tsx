import React, { useEffect, useState, ReactElement } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  List,
  Divider,
  Portal,
  Dialog,
} from 'react-native-paper';
import {
  useNavigation,
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { colors, showErrorForDev, alertaRemocaoItem } from '../../utils';
import exportarLista from './exportar-lista';
import ListaEstoque from '../../type/ListaEstoque';
import storage from '../../database/localStorage';

interface ShowItem {
  [x: string]: boolean
}

type RootStackParamList = {
  Itens: { updatePage: string };
};

interface Props {
  route: RouteProp<RootStackParamList, 'Itens'>
}

const ListItem = ({ route }: Props): ReactElement => {
  const { params } = route;

  const [listaEstoque, setListaEstoque] = useState<ListaEstoque[]>([]);
  const [showDialog, setShowDialog] = useState<ShowItem>({});

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const listarItensPermanente = async () => {
    try {
      const lista = await storage.getEstoqueAsync();

      if (lista) {
        setListaEstoque(JSON.parse(lista));
      }
    } catch (error) {
      showErrorForDev(error);
    }
  };

  const removerItemDaLista = async (id: string) => {
    alertaRemocaoItem(async () => {
      try {
        const armazem = await storage.getEstoqueAsync();

        if (!armazem) {
          return;
        }

        const itens: ListaEstoque[] = JSON.parse(armazem);

        await storage.setEstoqueAsync(itens.filter((item) => item.id !== id));

        await listarItensPermanente();

        setShowDialog({ [id]: false });
      } catch (error) {
        showErrorForDev(error);
      }
    });
  };

  const editarLista = async (lista: ListaEstoque) => {
    try {
      navigation.navigate('Editar', { lista });

      setShowDialog({ [lista.id]: false });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  useEffect(() => {
    listarItensPermanente();
  }, [params?.updatePage]);

  return (
    <ScrollView>
      <Text style={styles.textResumo}>
        {!listaEstoque.length ? 'Nenhum item cadastrado' : ` ${listaEstoque.length} resultados`}
      </Text>
      {listaEstoque.map((item) => (
        <View key={item.id}>
          <TouchableOpacity onPress={() => setShowDialog({ [item.id]: true })}>
            <List.Item
              title={item.titulo}
              description={item.itens.length}
              left={() => (
                <View style={styles.viewIcon}>
                  <MaterialCommunityIcons
                    style={styles.iconItem}
                    name="format-list-bulleted"
                    color={colors.white}
                    size={30}
                  />
                </View>
              )}
            />
            <Divider />
          </TouchableOpacity>

          <Portal>
            <Dialog
              visible={showDialog[item.id]}
              onDismiss={() => setShowDialog({ [item.id]: false })}
            >
              <List.Item
                title="Editar"
                onPress={() => editarLista(item)}
                right={() => (
                  <MaterialCommunityIcons
                    name="file-document-edit-outline"
                    style={{ top: 5 }}
                    color={colors.primary}
                    size={25}
                  />
                )}
              />
              <Divider />
              <List.Item
                title="Excluir"
                onPress={() => removerItemDaLista(item.id)}
                right={() => (
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    style={{ top: 5 }}
                    color={colors.danger}
                    size={25}
                  />
                )}
              />
              <Divider />
              <List.Item
                title="Exportar"
                onPress={() => exportarLista(item.titulo, 'txt', () => {
                  setShowDialog({ [item.id]: false });
                })}
                right={() => (
                  <MaterialCommunityIcons
                    name="file-export-outline"
                    style={{ top: 5 }}
                    color={colors.cyan}
                    size={25}
                  />
                )}
              />
              <Divider />
            </Dialog>
          </Portal>
        </View>
      ))}
    </ScrollView>
  );
};

export default ListItem;
