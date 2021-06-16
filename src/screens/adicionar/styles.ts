import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils';

export const stylesSalvarItem = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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

export const stylesScanner = StyleSheet.create({
  container: {
    top: 0,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    color: colors.danger,
    fontSize: 20,
    fontWeight: '700',
  },
  scanner: {
    height: Dimensions.get('window').height - 138,
    width: Dimensions.get('window').width,
  },
  menuBottom: {
    backgroundColor: colors.blue,
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '10.5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewIcon: {
    justifyContent: 'center',
  },
  iconItem: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: colors.blue,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'transparent',
    width: 70,
  },
});
