import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import { Alert } from 'react-native';
import { showErrorForDev } from '../../utils';
import ListaEstoque from '../../type/ListaEstoque';
import storage from '../../database/localStorage';

const exportarEmJson = async (callback: () => void) => {
  try {
    const armazem: string | null = await storage.getEstoqueAsync();

    if (!armazem) {
      Alert.alert('Atenção', 'A lista está vazia');
      return;
    }

    const fileName = `${moment().format('YYYYMMDD_HHmmss')}`;

    const fileUri = `${FileSystem.documentDirectory}${fileName}.json`;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(armazem));

    await Sharing.shareAsync(fileUri, { mimeType: 'application/json' });
  } catch (error) {
    showErrorForDev(error);
  } finally {
    callback();
  }
};

const exportarEmTxt = async (fileName: string, callback: () => void) => {
  try {
    const armazem: string | null = await storage.getEstoqueAsync();

    if (!armazem) {
      Alert.alert('Atenção', 'A lista está vazia');
      return;
    }

    const itens: ListaEstoque[] = JSON.parse(armazem);

    let content = '';

    itens
      .filter((item) => item.titulo === fileName)
      .map((item) => item.itens)[0]
      .forEach((item) => {
        content += `${item.codigo},${item.quantidade}\n`;
      });

    const nomeArquivo = `${moment().format('YYYYMMDD_HHmmss')}`;

    const fileUri = `${FileSystem.documentDirectory}${nomeArquivo}.txt`;
    await FileSystem.writeAsStringAsync(fileUri, content.trim());

    await Sharing.shareAsync(fileUri, { mimeType: 'text/plain' });
  } catch (error) {
    showErrorForDev(error);
  } finally {
    callback();
  }
};

const exportarLista = (fileName: string, type: string, callback: () => void): void => {
  switch (type) {
    case 'json':
      exportarEmJson(callback);
      break;
    case 'txt':
      exportarEmTxt(fileName, callback);
      break;

    default:
      exportarEmTxt(fileName, callback);
      break;
  }
};

export default exportarLista;
