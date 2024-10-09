import { useEffect } from 'react';
import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      if (
        granted['android.permission.BLUETOOTH_SCAN'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.BLUETOOTH_ADVERTISE'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.BLUETOOTH_CONNECT'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.ACCESS_FINE_LOCATION'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Required Bluetooth permissions not granted.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

// const startBLEAdvertising = () => {
//   const bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
//   if (!bluetoothAdapter || !bluetoothAdapter.isEnabled()) {
//     console.error('Bluetooth가 비활성화되어 있습니다.');
//     return;
//   }

//   const uuid = '12345678-1234-1234-1234-1234567890ab'; // 원하는 UUID
//   const deviceName = 'MyDevice';
//   const data = 'HelloBLE';
//   BLEAdvertiser.startAdvertising(uuid, deviceName, data);
// };
