import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { stylesFabSalvarItem as styles } from './styles';

interface Props {
  salvarItem: () => void
}

const FabSalvarItem = ({ salvarItem }: Props): ReactElement => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        icon={() => (
          <MaterialCommunityIcons name="close" color="#fff" size={29} />
        )}
        onPress={() => navigation.goBack()}
      />
      <FAB
        style={styles.fab}
        icon={() => (
          <MaterialCommunityIcons name="content-save-outline" color="#fff" size={24} />
        )}
        onPress={salvarItem}
      />
    </View>
  );
};

export default FabSalvarItem;
