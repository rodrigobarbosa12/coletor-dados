import React, { ReactElement } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { colors } from '../utils';

const BackAction = (): ReactElement => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Appbar.BackAction color={colors.white} onPress={() => navigation.goBack()} />
  );
};

export default BackAction;
