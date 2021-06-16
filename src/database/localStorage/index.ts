import { AsyncStorage } from 'react-native';
import { LISTA_ESTOQUE } from '../../utils/constantes';
import ListaEstoque from '../../type/ListaEstoque';

const getEstoqueAsync = (): Promise<string | null> => AsyncStorage.getItem(LISTA_ESTOQUE);

const setEstoqueAsync = (params: ListaEstoque[]): Promise<void> => (
  AsyncStorage.setItem(LISTA_ESTOQUE, JSON.stringify(params))
);

export default {
  getEstoqueAsync,
  setEstoqueAsync,
};
