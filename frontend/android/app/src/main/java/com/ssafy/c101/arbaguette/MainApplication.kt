package com.ssafy.c101.arbaguette

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import com.ssafy.c101.arbaguette.MyCustomBLEPackage // MyCustomBLEPackage import 추가

class MainApplication : Application(), ReactApplication {

    // ReactNativeHost를 프로퍼티로 정의
    override val reactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            return listOf(
                MainReactPackage(),
                MyCustomBLEPackage() // BLE 패키지 추가
            )
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
    }
}
