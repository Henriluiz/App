import { Linking, Alert } from 'react-native';

export async function AbrirLinkExterno(url) {
  try {
    const link = url.startsWith('http') ? url : `https://${url}`;
    await Linking.openURL(link);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir o link.');
    console.log(error);
  }
}