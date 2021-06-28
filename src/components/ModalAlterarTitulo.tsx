import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import {
  TextInput,
  Portal,
  Dialog,
} from 'react-native-paper';

interface Props {
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
  titulo: string,
  setTitulo: Dispatch<SetStateAction<string>>,
}

const ModalAlterarTitulo = ({
  visible,
  titulo,
  setTitulo,
  setVisible,
}: Props): ReactElement => (
  <Portal>
    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
      <TextInput
        autoFocus
        autoCorrect={false}
        label="Nome da lista"
        value={titulo}
        onChangeText={(title) => setTitulo(title)}
      />
    </Dialog>
  </Portal>
);

export default ModalAlterarTitulo;
