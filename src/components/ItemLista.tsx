import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Item } from '../type/ListaEstoque';
import { colors } from '../utils';
import { stylesItemList as styles } from './styles';

interface Props {
  item: Item,
  ultimoItemId: string | undefined,
}

const ItemLista = ({ item, ultimoItemId }: Props): ReactElement => (
  <List.Item
    title={item.codigo}
    titleStyle={{ maxWidth: '80%' }}
    style={{ padding: 0, height: 55 }}
    right={() => (
      <>
        <View style={styles.viewQuantidade}>
          <Text style={{ color: colors.white }}>{item.quantidade}</Text>
        </View>
        <View style={styles.viewOption}>
          <View style={{ flexDirection: 'row' }}>
            {ultimoItemId === item.id && (
              <MaterialCommunityIcons name="playlist-edit" color={colors.gray} size={23} />
            )}
            <MaterialCommunityIcons name="trash-can-outline" color={colors.gray} size={20} />
          </View>
        </View>
      </>
    )}
  />
);

export default ItemLista;