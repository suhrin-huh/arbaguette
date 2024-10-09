package com.ssafy.c101.arbaguette

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = BleAdvertiserModule.NAME)
class BleAdvertiserModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "BLEAdvertiser"
    }

    // ReactApplicationContext를 BLEAdvertiser에 전달
    private val bleAdvertiser = BLEAdvertiser(reactContext)

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun startAdvertising(uuid: String, deviceName: String, data: String) {
        bleAdvertiser.startAdvertising(uuid, deviceName, data)
    }

    @ReactMethod
    fun stopAdvertising() {
        bleAdvertiser.stopAdvertising()
    }
}
