import AlertAsync from 'react-native-alert-async';

/* eslint-disable no-plusplus */
const validadorEan = async (numero: string, setScanned: (x: boolean) => void): Promise<boolean> => {
  let factor = 3;
  let sum = 0;
  const numlen = numero.length;

  if (numlen === 13) {
    for (let index = numero.length; index > 0; --index) {
      if (index !== 13) {
        sum += Number(numero.substring(index - 1, index)) * factor;
        factor = 4 - factor;
      }
    }

    const cc = ((1000 - sum) % 10);
    const ca = Number(numero.substring(12));

    if (cc === ca) {
      return true;
    }

    setScanned(true);
    await AlertAsync(
      'Atenção',
      'Código EAN13 inválido',
      [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false);
          },
        },
      ],
    );

    return false;
  }

  setScanned(true);
  const retorno: boolean = await AlertAsync(
    'Atenção',
    'O código não é do tipo EAN13, deseja adicioná-lo?',
    [
      {
        text: 'Não',
        onPress: () => {
          setScanned(false);
          return false;
        },
      },
      {
        text: 'Sim',
        onPress: () => {
          setScanned(false);
          return true;
        },
      },
    ],
  );

  return retorno;
};

export default validadorEan;
