import React, { useState, ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FabSalvarItem } from '../../components';
import { colors, showErrorForDev } from '../../utils';
import { stylesCadastroManual as styles } from './styles';

type RootStackParamList = {
  CadastroManual: { routeName: string };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'CadastroManual'>
}

const CadastroManual = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;

  const [nome, setNome] = useState<string>('');
  const [codigo, setCodigo] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);

  const incluirNaListaTemporaria = async () => {
    try {
      const item = {
        id: `item-${moment().format('YYYYMMDD-HHmmss')}`,
        nome,
        codigo,
        quantidade,
      };
      navigation.navigate(params.routeName, { itens: item });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          label="Nome"
          value={nome}
          onChangeText={(value) => setNome(value)}
        />
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
