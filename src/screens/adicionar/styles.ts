import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils';

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
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
});

export const stylesCadastroManual = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 15,
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

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoScanner: {
    color: colors.gray,
    width: '90%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
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
  viewInput: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    maxWidth: 70,
  },
});
