import React, { useState, ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FabSalvarItem } from '../../components';
import { colors, showErrorForDev } from '../../utils';
import { stylesCadastroManual as styles } from './styles';

const CadastroManual = (): ReactElement => {
  const [codigo, setCodigo] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const incluirNaListaTemporaria = async () => {
    try {
      const item = {
        id: `item-${moment().format('YYYYMMDD-HHmmss')}`,
        codigo,
        quantidade,
      };
      navigation.navigate('Adicionar', { itens: item });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          label="Código de barras"
          value={codigo}
          right={<TextInput.Icon name="barcode" />}
          onChangeText={(value) => setCodigo(value)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <TextInput
            style={styles.input2}
            label="Quantidade"
            value={String(quantidade)}
            keyboardType="numeric"
            onChangeText={(value) => setQuantidade(Number(value))}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setQuantidade(Number(quantidade) - 1)}
          >
            <MaterialCommunityIcons name="minus-circle" color={colors.danger} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setQuantidade(Number(quantidade) + 1)}
          >
            <MaterialCommunityIcons name="plus-circle" color={colors.success} size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <FabSalvarItem salvarItem={incluirNaListaTemporaria} />
    </>
  );
};

export default CadastroManual;
