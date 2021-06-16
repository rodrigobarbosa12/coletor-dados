import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarHeader from './components/BarHeader';
import Home from './screens/home';
import Adicionar from './screens/adicionar';
import Itens from './screens/itens';
import Scanner from './screens/adicionar/Scanner';
import Editar from './screens/editar';

const Routes = (): ReactElement => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={Home}
          options={{
            header: () => <BarHeader withGoBack={false} title="Coletor de dados" search={false} />,
          }}
        />
        <Screen
          name="Adicionar"
          component={Adicionar}
          options={{
            header: () => <BarHeader title="Conferência de estoque" search={false} />,
          }}
        />
        <Screen
          name="Itens"
          component={Itens}
          options={{
            header: () => <BarHeader title="Itens do estoque" search={false} />,
          }}
        />
        <Screen
          name="Scanner"
          component={Scanner}
          options={{
            header: () => <BarHeader title="Scanner" search={false} />,
          }}
        />
        <Screen
          name="Editar"
          component={Editar}
          options={{
            header: () => <BarHeader title="Editar" search={false} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;