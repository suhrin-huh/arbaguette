package com.ssafy.c101.arbaguette

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.bluetooth.le.AdvertiseCallback
import android.bluetooth.le.AdvertiseData
import android.bluetooth.le.AdvertiseSettings
import android.bluetooth.le.BluetoothLeAdvertiser
import android.content.Context
import android.content.Intent
import android.os.ParcelUuid
import android.util.Log

class BLEAdvertiser(private val context: Context) {

    private val TAG = "BLEAdvertiser"
    private val bluetoothManager: BluetoothManager = context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private val bluetoothAdapter: BluetoothAdapter? = bluetoothManager.adapter
    private val advertiser: BluetoothLeAdvertiser? = bluetoothAdapter?.bluetoothLeAdvertiser

    // 블루투스 활성화 요청
    fun enableBluetooth() {
        if (bluetoothAdapter == null) {
            Log.e(TAG, "Bluetooth is not supported on this device")
            return
        }
        if (!bluetoothAdapter.isEnabled) {
            // 블루투스가 꺼져있을 경우 블루투스 활성화를 요청하는 Intent 실행
            val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
            context.startActivity(enableBtIntent)
            Log.d(TAG, "Requesting to enable Bluetooth")
        } else {
            Log.d(TAG, "Bluetooth is already enabled")
        }
    }

    fun startAdvertising(uuid: String, deviceName: String, data: String) {
        if (advertiser == null || bluetoothAdapter?.isEnabled != true) {
            Log.e(TAG, "Bluetooth is not enabled or advertiser is null")
            enableBluetooth() // 블루투스가 비활성화된 경우 활성화 요청
            return
        }

        // 광고 설정
        val settings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
            .setConnectable(true)
            .build()

        // 광고 데이터 설정
        val advertiseData = AdvertiseData.Builder()
            .setIncludeDeviceName(true)
            .addServiceUuid(ParcelUuid.fromString(uuid))
            .addServiceData(ParcelUuid.fromString(uuid), data.toByteArray())
            .build()

        // 디바이스 이름 설정
        bluetoothAdapter.name = deviceName

        // 광고 시작
        advertiser.startAdvertising(settings, advertiseData, advertiseCallback)
        Log.d(TAG, "Started advertising with UUID: $uuid, DeviceName: $deviceName, Data: $data")
    }

    // 광고 중지
    fun stopAdvertising() {
        advertiser?.stopAdvertising(advertiseCallback)
        Log.d(TAG, "Stopped BLE Advertising")
    }

    // BLE 광고 콜백
    private val advertiseCallback = object : AdvertiseCallback() {
        override fun onStartSuccess(settingsInEffect: AdvertiseSettings) {
            super.onStartSuccess(settingsInEffect)
            Log.d(TAG, "BLE Advertising started successfully with settings: $settingsInEffect")
        }

        override fun onStartFailure(errorCode: Int) {
            super.onStartFailure(errorCode)
            Log.e(TAG, "BLE Advertising failed with error code: $errorCode")
        }
    }
}
