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
    backgroundColor: colors.blue,
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
    backgroundColor: colors.blue,
    marginHorizontal: 5,
  },
});

export default styles;
