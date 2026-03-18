import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

function AbrirLinkExterno(url) {
  if (!url) return null;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
}

async function open(url, options = {}) {
  const { showError = true } = options;

  try {
    const normalizedUrl = AbrirLinkExterno(url);

    if (!normalizedUrl) {
      throw new Error('URL inválida');
    }

    const supported = await Linking.canOpenURL(normalizedUrl);

    if (!supported) {
      throw new Error('Link não suportado');
    }

    await Linking.openURL(normalizedUrl);

  } catch (error) {
    console.log('LinkService error:', error);

    if (showError) {
      Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
  }
}

export const LinkService = {
  open
};