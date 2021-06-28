import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarHeader from './components/BarHeader';
import Home from './screens/home';
import Adicionar from './screens/adicionar';
import Itens from './screens/itens';
import Search from './screens/itens/Search';
import Scanner from './screens/adicionar/Scanner';
import Editar from './screens/editar';
import CadastroManual from './screens/adicionar/CadastroManual';

const Routes = (): ReactElement => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={Home}
          options={{
            header: () => <BarHeader withGoBack={false} title="Estoque Orto baby" search />,
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
          name="Search"
          component={Search}
          options={{
            header: () => <BarHeader title="Pesquisar no estoque" search={false} />,
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
        <Screen
          name="CadastroManual"
          component={CadastroManual}
          options={{
            header: () => <BarHeader title="Cadastro manual" search={false} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
