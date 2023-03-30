package com.reactnativetappayhook;

// import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
// import com.facebook.react.uimanager.IllegalViewOperationException;
// import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeMap;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import tech.cherri.tpdirect.api.TPDCardValidationResult;

// https://codeantenna.com/a/CRDAQIUluT
public class RNToolsManager extends ReactContextBaseJavaModule {
  TappayManager TappayManager;

  public RNToolsManager(ReactApplicationContext reactContext) {
    super(reactContext);
    TappayManager = new TappayManager(reactContext);
  }

  // 複寫getName方法定義Module名稱,在ReactNative呼叫時使用
  @Override
  public String getName() {
    return "RNToolsManager";
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的initInstance
  @ReactMethod
  public void TappayInitInstance(int APP_ID, String APP_KEY, Boolean prod, Promise promise) {
    try {
      TappayManager.initInstance(APP_ID, APP_KEY, prod);
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("android error TappayInitInstance", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDCard
  @ReactMethod
  public void TappaySetTPDCard(String cardNumber, String dueMonth, String dueYear, String CCV,
      Promise promise) {
    try {
      TPDCardValidationResult result = TappayManager.TPDCard(cardNumber, dueMonth, dueYear, CCV);
      WritableNativeMap resultData = new WritableNativeMap();

      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("cardNumber", cardNumber);
      resultData.putString("dueMonth", dueMonth);
      resultData.putString("dueYear", dueYear);
      resultData.putString("CCV", CCV);
      resultData.putBoolean("isCardNumberValid", result.isCardNumberValid());
      resultData.putBoolean("isExpiryDateValid", result.isExpiryDateValid());
      resultData.putBoolean("isCCVValid", result.isCCVValid());
      resultData.putString("cardType", String.valueOf(result.getCardType()));

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappaySetTPDCard", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的createToken
  @ReactMethod
  public void TappayHandlerDirectPay(String geoLocation, Promise promise) {
    try {
      TappayManager.handlerDirectPay(geoLocation, promise);
    } catch (Exception e) {
      promise.reject("android error TappayHandlerDirectPay", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的getRbaDeviceId
  @ReactMethod
  public void TappayGetDeviceId(Promise promise) {
    try {
      promise.resolve(TappayManager.getDeviceId());
    } catch (Exception e) {
      promise.reject("android error TappayHandlerDirectPay", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，對TappaySDK的TPDGooglePay做初始化
  @ReactMethod
  public void TappayGooglePayInit(String merchantName, Promise promise) {
    try {
      TappayManager.googlePayInit(merchantName, promise);
    } catch (Exception e) {
      promise.reject("android error TappayGooglePayInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDGooglePay的requestPayment
  @ReactMethod
  public void TappayHandlerGooglePay(String totalPrice, String currencyCode, Promise promise) {
    try {
      TappayManager.handlerGooglePay(totalPrice, currencyCode, promise);
    } catch (Exception e) {
      promise.reject("android error TappayHandlerGooglePay", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayAapplePayInit方法
  @ReactMethod
  public void TappayAapplePayInit(String merchantName, String merchantId, String countryCode, String currencyCode,
      Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putBoolean("isReadyToPay", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayAapplePayInit", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayIsApplePayAvailable方法
  @ReactMethod
  public void TappayIsApplePayAvailable(Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putBoolean("isReadyToPay", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsApplePayAvailable", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayHandlerApplePay方法
  @ReactMethod
  public void TappayHandlerApplePay(String amount, Promise promise) {
    promise.reject("android error TappayHandlerApplePay", "android not support ApplePay");
  }

  // 宣告給ReactNative使用的function名稱，對應ios版的TappayLinePayHandleURL方法
  @ReactMethod
  public void TappayLinePayHandleURL(String openUri, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("openUri", openUri);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsLinePayAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的isLinePayAvailable
  @ReactMethod
  public void TappayIsLinePayAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isLinePayAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsLinePayAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的linePayInit
  @ReactMethod
  public void TappayLinePayInit(String linePayCallbackUri, Promise promise) {
    try {
      boolean result = TappayManager.linePayInit(linePayCallbackUri);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("linePayCallbackUri", linePayCallbackUri);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayLinePayInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的getPrime
  @ReactMethod
  public void TappayGetLinePayPrime(Promise promise) {
    try {
      TappayManager.getLinePayPrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetLinePayPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的redirectWithUrl，並自動完成跳轉資料的監聽
  @ReactMethod
  public void TappayHandlerLinePay(String paymentUrl, Promise promise) {
    try {
      TappayManager.handlerLinePay(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayHandlerLinePay", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的redirectWithUrl
  @ReactMethod
  public void TappayLinePayRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.linePayRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayLinePayRedirectWithUrl", e);
    }
  }
}