import React, { ReactElement } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils';
import styles from './styles';
import logo from '../../imagens/logo.png';

interface Props {
    navigation: NavigationProp<ParamListBase>
}

const Home = ({ navigation }: Props): ReactElement => (
  <View style={styles.container}>
    <View style={styles.headerText}>
      <Image source={logo} style={{ width: '50%', height: '50%' }} />
      {/* <Text style={styles.title}>Max scalla</Text> */}
    </View>
    <View style={styles.menu}>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Adicionar')}
        >
          <MaterialCommunityIcons name="playlist-plus" color={colors.white} size={50} />
          <Text style={styles.textButton}>Novo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Itens')}
        >
          <MaterialCommunityIcons name="folder-open-outline" color={colors.white} size={50} />
          <Text style={styles.textButton}>Abrir</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default Home;
