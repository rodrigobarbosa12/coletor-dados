import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';
import { colors } from './src/utils';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.purple,
    accent: '#f1c40f',
  },
};

const App = (): ReactElement => (
  <PaperProvider theme={theme}>
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar style="inverted" />
    <Routes />
  </PaperProvider>
);

export default App;
