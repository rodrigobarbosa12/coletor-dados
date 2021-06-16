import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  headerText: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.primary,
  },
  menu: {
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    height: 120,
    width: 130,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    backgroundColor: colors.blue,
  },
  textButton: {
    fontSize: 20,
    color: colors.white,
  },
});
