module.exports = {
  expo: {
    name: 'arbagett',
    slug: 'arbagett',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'arbaguette',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
      },
      package: 'com.ssafy.c101.arbaguette',
      permissions: ['android.permission.NFC'],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-image-picker',
      'expo-router',
      'react-native-nfc-manager',
      [
        'expo-dev-launcher',
        {
          launchMode: 'most-recent',
        },
      ],
      [
        'react-native-ble-plx',
        {
          isBackgroundEnabled: true,
        },
      ],
      '@config-plugins/react-native-blob-util',
      '@config-plugins/react-native-pdf',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '6d44bbb7-144b-4931-9d56-c6537ce7be4d',
      },
    },
  },
};
