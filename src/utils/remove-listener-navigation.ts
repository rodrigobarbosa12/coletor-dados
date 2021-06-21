import { NavigationProp, ParamListBase } from '@react-navigation/native';

const removeListenerNavigation = (navigation: NavigationProp<ParamListBase>): void => (
  navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action))
);

export default removeListenerNavigation;
