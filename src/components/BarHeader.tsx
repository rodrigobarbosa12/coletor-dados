import React, { ReactElement } from 'react';
import { Appbar } from 'react-native-paper';
import BackAction from './BackAction';
import { colors, showErrorForDev } from '../utils';

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
}: Props): ReactElement => (
  <Appbar.Header>
    {withGoBack && <BackAction />}
    <Appbar.Content title={title} subtitle={subtitle} color={colors.white} />
    {search && <Appbar.Action icon="magnify" color={colors.white} onPress={() => showErrorForDev('Pesquisa')} />}
  </Appbar.Header>
);

BarHeader.defaultProps = {
  withGoBack: true,
  subtitle: undefined,
  search: true,
};

export default BarHeader;
