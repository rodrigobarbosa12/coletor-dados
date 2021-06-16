import React, { useState, useEffect, ReactElement } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors, showErrorForDev } from '../../utils';
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
  const [typeScanner, setTypeScanner] = useState<'front' | 'back'>('back');
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const salvarTemporariamente = async (codigo: string) => {
    try {
      setScanned(true);
      const item = {
        id: moment().format('YYYYMMDD-HHmmss'),
        codigo,
        quantidade: 1,
      };
      navigation.navigate(params?.routeName, { itens: item });
    } catch (error) {
      showErrorForDev(error);
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    salvarTemporariamente(data);
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
          type={typeScanner}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>
      <View style={styles.menuBottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTypeScanner(typeScanner === 'back' ? 'front' : 'back')}
        >
          <MaterialCommunityIcons name="camera-retake-outline" color={colors.blue} size={40} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Scanner;
