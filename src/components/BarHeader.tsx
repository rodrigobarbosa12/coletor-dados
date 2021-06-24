import React, { ReactElement } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import BackAction from './BackAction';
import { colors } from '../utils';

interface Props {
  title: string,
  subtitle?: string,
  withGoBack?: boolean,
  search?: boolean,
}

const BarHeader = ({
  withGoBack,
  title,
  subtitle,
  search,
}: Props): ReactElement => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Appbar.Header>
      {withGoBack && <BackAction />}
      <Appbar.Content title={title} subtitle={subtitle} color={colors.white} />
      {search && <Appbar.Action icon="magnify" color={colors.white} onPress={() => navigation.navigate('Search')} />}
    </Appbar.Header>
  );
};

BarHeader.defaultProps = {
  withGoBack: true,
  subtitle: undefined,
  search: true,
};

export default BarHeader;
