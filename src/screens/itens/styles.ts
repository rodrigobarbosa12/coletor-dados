import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textResumo: {
    margin: 15,
    color: colors.gray,
    fontSize: 15,
    fontWeight: '700',
  },
  viewIcon: {
    justifyContent: 'center',
  },
  iconItem: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: colors.purple,
  },
});
