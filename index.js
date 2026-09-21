import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';

if (Platform.OS === 'web') {
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'auto';

    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.overflow = 'auto';

    const root = document.getElementById('root');

    if (root) {
        root.style.minHeight = '100%';
        root.style.height = 'auto';
        root.style.overflow = 'visible';
    }
}

registerRootComponent(App);