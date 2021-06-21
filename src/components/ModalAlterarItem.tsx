import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Portal, Dialog, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stylesEditar } from './styles';
import { Item } from '../type/ListaEstoque';
import { colors } from '../utils';

interface Props {
  visible: boolean,
  onDismiss: () => void,
  removerItem: (x: string) => void
  alterarValorInput: (a: number, b: string) => void,
  onChangeCodigo: (a: string, b: string) => void,
  alterarQuantidadePorItem: (a: string, b: string) => void,
  item: Item,
}

const ModalAlterarItem = ({
  visible,
  onDismiss,
  removerItem,
  alterarQuantidadePorItem,
  alterarValorInput,
  onChangeCodigo,
  item,
}: Props): ReactElement => (
  <Portal>
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
    >
      <View style={stylesEditar.container}>
        <TextInput
          style={stylesEditar.input}
          label="Código de barras"
          value={item.codigo}
          right={<TextInput.Icon name="barcode" />}
          onChangeText={(value) => onChangeCodigo(value, item.id)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <TextInput
            style={stylesEditar.input2}
            label="Quantidade"
            value={String(item.quantidade || 0)}
            keyboardType="numeric"
            onChangeText={(total) => alterarValorInput(Number(total), item.id)}
          />
          <TouchableOpacity
            style={stylesEditar.button}
            onPress={() => { removerItem(item.id); onDismiss(); }}
          >
            <MaterialCommunityIcons name="trash-can-outline" color={colors.grey} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesEditar.button}
            onPress={() => alterarQuantidadePorItem('sub', item.id)}
          >
            <MaterialCommunityIcons name="minus-circle" color={colors.danger} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesEditar.button}
            onPress={() => alterarQuantidadePorItem('soma', item.id)}
          >
            <MaterialCommunityIcons name="plus-circle" color={colors.success} size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  </Portal>
);

export default ModalAlterarItem;
