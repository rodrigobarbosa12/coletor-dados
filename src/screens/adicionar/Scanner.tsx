import React, { useState, useEffect, ReactElement } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { showErrorForDev, validadorEan } from '../../utils';
import { stylesScanner as styles } from './styles';

type RootStackParamList = {
  Scanner: { routeName: string };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Scanner'>
}

const Scanner = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const incluirNaListaTemporaria = async (codigo: string) => {
    try {
      setScanned(true);
      const item = {
        id: `item-${moment().format('YYYYMMDD-HHmmss')}`,
        nome: '',
        codigo,
        quantidade: 1,
      };
      navigation.navigate(params.routeName, { itens: item });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    console.log('opaaaaaaa')
    if (!await validadorEan(data, setScanned)) {
      return;
    }

    incluirNaListaTemporaria(data);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.info}>
        <Text style={styles.textInfo}>
          Solicitando permissão de câmera
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.info}>
        <Text style={styles.textInfo}>
          Sem acesso à câmera
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={() => console.log('opaaaa')}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={styles.scanner}
        />
      </View>
      <View style={styles.menuBottom}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CadastroManual', { routeName: params?.routeName })}
        >
          <Text style={styles.text}>Cadastrar manualmente</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Scanner;
