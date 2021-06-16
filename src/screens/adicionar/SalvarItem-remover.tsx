// import React, { useState, ReactElement } from 'react';
// import moment from 'moment';
// import { View, TouchableOpacity, AsyncStorage } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import {
//   useNavigation,
//   RouteProp,
//   NavigationProp,
//   ParamListBase,
// } from '@react-navigation/native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import FabSalvarItem from '../../components/FabSalvarItem';
// import ITENS_TEMPORARIO from '../../utils/constantes';
// import { colors, showErrorForDev } from '../../utils';
// import { stylesSalvarItem as styles } from './styles';

// interface Props {
//   route: RouteProp<ParamListBase, 'ScannerProps'>
// }

// const SalvarItem = ({ route }: Props): ReactElement => {
//   const navigation: NavigationProp<ParamListBase> = useNavigation();
//   const { params } = route;

//   const [codigo, setCodigo] = useState<string>(params?.data);
//   const [quantidade, setQuantidade] = useState<number>(1);

//   const salvarItem = async () => {
//     try {
//       const item = {
//         id: moment().format('YYYYMMDD-HHmmss'),
//         codigo,
//         quantidade,
//       };

//       const itens = await AsyncStorage.getItem(ITENS_TEMPORARIO);

//       if (!itens) {
//         await AsyncStorage.setItem(ITENS_TEMPORARIO, JSON.stringify([item]));
//         navigation.navigate('Adicionar', { showList: true });
//         return;
//       }

//       const lista = JSON.parse(itens);
//       lista.push(item);

//       await AsyncStorage.setItem(ITENS_TEMPORARIO, JSON.stringify(lista));
//       navigation.navigate('Adicionar', { showList: lista.length });
//     } catch (error) {
//       showErrorForDev(error);
//     }
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           label="Código de barras"
//           value={codigo}
//           onChangeText={(value) => setCodigo(value)}
//           right={<TextInput.Icon name="barcode" />}
//         />
//         <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
//           <TextInput
//             style={styles.input2}
//             label="Quantidade"
//             value={String(quantidade || 0)}
//             keyboardType="numeric"
//             onChangeText={(value) => setQuantidade(Number(value))}
//           />
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setQuantidade(Number(quantidade) - 1)}
//           >
//             <MaterialCommunityIcons name="minus-circle" color={colors.danger} size={40} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setQuantidade(Number(quantidade) + 1)}
//           >
//             <MaterialCommunityIcons name="plus-circle" color={colors.success} size={40} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <FabSalvarItem salvarItem={salvarItem} />
//     </>
//   );
// };

// export default SalvarItem;
