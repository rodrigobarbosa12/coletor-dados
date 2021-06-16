import { Alert } from 'react-native';

const showErrorForDev = (message: string): void => (
  console.error(message) // eslint-disable-line no-console
);

export const alertaRemocaoItem = (onPress: () => void): void => {
  Alert.alert(
    'Atenção',
    'Deseja mesmo remover esse item?',
    [
      {
        text: 'Voltar',
      },
      {
        text: 'Remover',
        onPress,
      },
    ],
  );
};

export default showErrorForDev;
