import { StyleSheet } from 'react-native';
import { colors } from '../utils';

const styles = StyleSheet.create({});

export const stylesFabSalvarItem = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    margin: 20,
    right: 0,
    bottom: 0,
  },
  fab: {
    backgroundColor: colors.purple,
    marginHorizontal: 5,
  },
});

export const stylesFabScanner = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    margin: 20,
    right: 0,
    bottom: 0,
  },
  fab: {
    backgroundColor: colors.purple,
    marginHorizontal: 5,
  },
});

export const stylesEditar = StyleSheet.create({
  container: {
    marginVertical: 25,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: 'transparent',
  },
  input2: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  button: {
    marginHorizontal: 10,
  },
});

export const stylesItemList = StyleSheet.create({
  viewQuantidade: {
    width: '20%',
    height: 54,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOption: {
    width: '15%',
    height: 54,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
