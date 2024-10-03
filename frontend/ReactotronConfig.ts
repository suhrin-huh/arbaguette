import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Arbaguette',
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();
