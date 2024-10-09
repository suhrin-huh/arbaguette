import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
// import { BleManager } from 'react-native-ble-plx';
import BleManager from 'react-native-ble-manager';

interface Peripheral {
  advertising: {
    isConnectable: boolean;
    manufacturerData: {
      [key: string]: any;
    };
    manufacturerRawData: {
      CDVType: string;
      bytes: any[];
      data: string;
    };
    rawData: {
      CDVType: string;
      bytes: any[];
      data: string;
    };
    serviceData: {
      [key: string]: any;
    };
    serviceUUIDs: string[];
    txPowerLevel: number;
  };
  id: string;
  name: string | null;
  rssi: number;
}

const useBleScanner = () => {
  const [bleDevices, setBleDevices] = useState<Peripheral[]>([]);

  useEffect(() => {
    // const manager = new BleManager();
    // manager.startDeviceScan(null, null, (error, device) => {
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }

    //   if (device) {
    //     console.log(device.id);
    //     if (device.serviceUUIDs?.includes(process.env.EXPO_PUBLIC_BLE_UUID!)) {
    //       console.log(`디바이스 발견: ${device.name} (${device.serviceUUIDs})`);
    //     }
    //   }

    //   // if (device) {
    //   //   if (device.serviceUUIDs?.includes(process.env.EXPO_PUBLIC_BLE_UUID!)) {
    //   //     console.log(`디바이스 발견: ${device.name} (${device.serviceUUIDs})`);
    //   //   }
    //   // }
    // });

    // return () => {
    //   manager.destroy();
    // };

    // BLEManager 초기화
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('BLE Manager initialized');
        // 스캔 시작
        return BleManager.scan([], 5, false);
      })
      .then(() => {
        console.log('Scanning started');
      })
      .catch((error: any) => {
        console.error('Scan error', error);
      });
    // 이벤트 리스너 설정
    const BleManagerModule = NativeModules.BleManager;
    const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral: Peripheral) => {
      // id와 name이 모두 있는 경우에만 추가
      if (peripheral.id && peripheral.name) {
        // 기존에 이미 존재하는 기기인지 확인
        const isExisting = bleDevices.some((device) => device.id === peripheral.id);
        // 존재하지 않는 경우에만 추가
        if (!isExisting) {
          setBleDevices((prevDevices) => [...prevDevices, peripheral]);
          console.log('Device added:', peripheral.id, peripheral.name);
        }
      }
    });
    return () => {
      // 스캔 중지
      BleManager.stopScan().then(() => {
        console.log('Scan stopped');
      });
    };
  }, [bleDevices]);

  return { bleDevices };
};

export default useBleScanner;
