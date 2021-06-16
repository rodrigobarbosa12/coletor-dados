import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { stylesFabScanner as styles } from './styles';

interface Props {
  salvarItensPermanente: () => void,
  routeName: string,
}

const FabScanner = ({ salvarItensPermanente, routeName }: Props): ReactElement => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        icon={() => (
          <MaterialCommunityIcons name="content-save-outline" color="#fff" size={27} />
        )}
        onPress={salvarItensPermanente}
      />
      <FAB
        style={styles.fab}
        icon={() => (
          <MaterialCommunityIcons name="barcode-scan" color="#fff" size={24} />
        )}
        onPress={() => navigation.navigate('Scanner', { routeName })}
      />
    </View>
  );
};

export default FabScanner;
