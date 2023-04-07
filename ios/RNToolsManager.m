//
//  RNToolsManager.m
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/1/13.
//

// https://www.jianshu.com/p/6fc3f77e0213
#import "RNToolsManager.h"

@implementation RNToolsManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNToolsManager);
//  宣告給ReactNative使用，取得app版本號
RCT_EXPORT_METHOD(getAppVersion:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];// 取得目前版本號
    resolve(version);
  }
  @catch (NSException *exception) {
    reject(@"ios error getAppVersion", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的initInstance
RCT_EXPORT_METHOD(TappayInitInstance:(nonnull NSNumber *)APP_ID APP_KEY:(NSString *)APP_KEY prod:(BOOL)prod resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    self.TappayManager = [TappayManager alloc];
    [self.TappayManager initInstance:APP_ID APP_KEY:APP_KEY prod:prod];
    
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"success":@ YES
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayInitInstance", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的TPDCard
RCT_EXPORT_METHOD(TappaySetTPDCard:(NSString *)cardNumber dueMonth:(NSString *)dueMonth dueYear:(NSString *)dueYear CCV:(NSString *)CCV resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    TPDCardValidationResult *result = [self.TappayManager TPDCard:cardNumber dueMonth:dueMonth dueYear:dueYear CCV:CCV];
    NSString *cardType = [self.TappayManager cardTypeToString:result.cardType];

    resolve(@{
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"systemOS": @"ios",
      @"cardNumber":cardNumber,
      @"dueMonth":dueMonth,
      @"dueYear":dueYear,
      @"CCV":CCV,
      @"isCardNumberValid":[NSNumber numberWithBool:result.isCardNumberValid],
      @"isExpiryDateValid":[NSNumber numberWithBool:result.isExpiryDateValid],
      @"isCCVValid":[NSNumber numberWithBool:result.isCCVValid],
      @"cardType":cardType,
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappaySetTPDCard", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的createTokenWithGeoLocation
RCT_EXPORT_METHOD(TappayGetDirectPayPrime:(NSString *)geoLocation resolver:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getDirectPayPrime:geoLocation resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetDirectPayPrime", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的getDeviceId
RCT_EXPORT_METHOD(TappayGetDeviceId:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
   resolve([self.TappayManager getDeviceId]);
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetDeviceId", exception.description, nil);
  }
}

//  宣告給ReactNative使用，對應android版的TappayGooglePayInit方法
RCT_EXPORT_METHOD(TappayGooglePayInit:(NSString *)merchantName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  // reject(@"ios error TappayGooglePayInit", @"ios not support GooglePay", nil);
  resolve(@{
    @"systemOS": @"ios",
    @"tappaySDKVersion": self.TappayManager.SDKVersion,
    @"isReadyToPay": @NO,
    @"msg": @"ios not support GooglePay"
  });
}

//  宣告給ReactNative使用，對應android版的TappayHandlerGooglePay方法
RCT_EXPORT_METHOD(TappayGetGooglePayPrime:(NSString *)merchantName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  reject(@"ios error TappayGetGooglePayPrime", @"ios not support GooglePay", nil);
}

// 宣告給ReactNative使用的function名稱，對TappaySDK的TPDapplePay做初始化
RCT_EXPORT_METHOD(TappayAapplePayInit:(NSString *)merchantName merchantId:(NSString *)merchantId countryCode:(NSString *)countryCode currencyCode:(NSString *)currencyCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager applePayInit:merchantName merchantId:merchantId countryCode:countryCode currencyCode:currencyCode resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayAapplePayInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK的TPDapplePay的canMakePayments
RCT_EXPORT_METHOD(TappayIsApplePayAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    BOOL result = [self.TappayManager isApplePayAvailable];
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @(result)
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsApplePayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDapplePay的付款方法
RCT_EXPORT_METHOD(TappayGetApplePayPrime:(NSString *)amount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getApplePayPrime:amount resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetApplePayPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDlinePay的handleURL方法
RCT_EXPORT_METHOD(TappayLinePayHandleURL:(NSString *)openUri resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    bool success = [self.TappayManager linePayHandleURL:openUri];
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"openUri": openUri,
      @"success": @(success)
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsLinePayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDlinePay的isLinePayAvailable方法
RCT_EXPORT_METHOD(TappayIsLinePayAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    bool isReadyToPay = [self.TappayManager isLinePayAvailable];
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @(isReadyToPay)
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsLinePayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDlinePay的初始化方法
RCT_EXPORT_METHOD(TappayLinePayInit:(NSString *)linePayCallbackUri resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    bool isLinePayAvailable = [self.TappayManager linePayInit:linePayCallbackUri];
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @(isLinePayAvailable),
      @"linePayCallbackUri": linePayCallbackUri
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayLinePayInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDlinePay的getPrime
RCT_EXPORT_METHOD(TappayGetLinePayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getLinePayPrime:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetLinePayPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDlinePay的redirect
RCT_EXPORT_METHOD(TappayLinePayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager linePayRedirectWithUrl:paymentUrl resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayLinePayRedirectWithUrl", exception.description, nil);
  }
}

//  宣告給ReactNative使用，對應android版的TappaySamsungPayInit方法
RCT_EXPORT_METHOD(TappaySamsungPayInit:(NSString *)merchantName merchantId:(NSString *)merchantId currencyCode:(NSString *)currencyCode serviceId:(NSString *)serviceId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @NO,
      @"msg": @"ios not support SamsungPay"
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappaySamsungPayInit", exception.description, nil);
  }
}

//  宣告給ReactNative使用，對應android版的TappayGetSamsungPayPrime方法
RCT_EXPORT_METHOD(TappayGetSamsungPayPrime:(NSString *)itemTotalAmount shippingPrice:(NSString *)shippingPrice tax:(NSString *)tax totalAmount:(NSString *)totalAmount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  reject(@"ios error TappayGetSamsungPayPrime", @"ios not support SamsungPay", nil);
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDJkoPay的isJkoPayAvailable
RCT_EXPORT_METHOD(TappayIsJkoPayAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @([self.TappayManager isJkoPayAvailable])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsJkoPayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDJkoPay的初始化方法
RCT_EXPORT_METHOD(TappayJkoPayInit:(NSString *)_jkoPayUniversalLinks resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @([self.TappayManager jkoPayInit:_jkoPayUniversalLinks])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayJkoPayInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDJkoPay取得prime方法
RCT_EXPORT_METHOD(TappayGetJkoPayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getJkoPayPrime:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetJkoPayPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDJkoPay的跳轉付款方法
RCT_EXPORT_METHOD(TappayJkoPayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager jkoPayRedirectWithUrl:paymentUrl resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayJkoPayRedirectWithUrl", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDEasyWallet的isEasyWalletAvailable
RCT_EXPORT_METHOD(TappayIsEasyWalletAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @([self.TappayManager isEasyWalletAvailable])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsEasyWalletAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDEasyWallet的初始化方法
RCT_EXPORT_METHOD(TappayEasyWalletInit:(NSString *)easyWalletUniversalLinks resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"easyWalletUniversalLinks": easyWalletUniversalLinks,
      @"isReadyToPay": @([self.TappayManager easyWalletInit:easyWalletUniversalLinks])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayEasyWalletInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDEasyWallet取得prime方法
RCT_EXPORT_METHOD(TappayGetEasyWalletPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getEasyWalletPrime:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetEasyWalletPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDEasyWallet的跳轉付款方法
RCT_EXPORT_METHOD(TappayEasyWalletRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager easyWalletRedirectWithUrl:paymentUrl resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayEasyWalletRedirectWithUrl", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPiWallet的isPiWalletAvailable
RCT_EXPORT_METHOD(TappayIsPiWalletAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @([self.TappayManager isPiWalletAvailable])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsPiWalletAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPiWallet的初始化方法
RCT_EXPORT_METHOD(TappayPiWalletInit:(NSString *)piWalletUniversalLinks resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"piWalletUniversalLinks": piWalletUniversalLinks,
      @"isReadyToPay": @([self.TappayManager piWalletInit:piWalletUniversalLinks])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayPiWalletInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPiWallet取得prime方法
RCT_EXPORT_METHOD(TappayGetPiWalletPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getPiWalletPrime:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetPiWalletPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPiWallet的跳轉付款方法
RCT_EXPORT_METHOD(TappayPiWalletRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager piWalletRedirectWithUrl:paymentUrl resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayPiWalletRedirectWithUrl", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPlusPay的isPlusPayAvailable
RCT_EXPORT_METHOD(TappayIsPlusPayAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @([self.TappayManager isPlusPayAvailable])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsPlusPayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPlusPay的初始化方法
RCT_EXPORT_METHOD(TappayPlusPayInit:(NSString *)plusPayUniversalLinks resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"piWalletUniversalLinks": plusPayUniversalLinks,
      @"isReadyToPay": @([self.TappayManager plusPayInit:plusPayUniversalLinks])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayPlusPayInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPlusPay取得prime方法
RCT_EXPORT_METHOD(TappayGetPlusPayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getPlusPayPrime:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetPlusPayPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPlusPay的跳轉付款方法
RCT_EXPORT_METHOD(TappayPlusPayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager plusPayRedirectWithUrl:paymentUrl resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayPlusPayRedirectWithUrl", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPlusPay的isAtomePayAvailable
RCT_EXPORT_METHOD(TappayIsAtomePayAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"isReadyToPay": @([self.TappayManager isAtomePayAvailable])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsAtomePayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDPlusPay的初始化方法
RCT_EXPORT_METHOD(TappayAtomePayInit:(NSString *)atomePayUniversalLinks resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"atomePayUniversalLinks": atomePayUniversalLinks,
      @"isReadyToPay": @([self.TappayManager atomePayInit:atomePayUniversalLinks])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayAtomePayInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDAtomePay取得prime方法
RCT_EXPORT_METHOD(TappayGetAtomePayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager getAtomePayPrime:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayGetAtomePayPrime", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDAtomePay的跳轉付款方法
RCT_EXPORT_METHOD(TappayAtomePayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager atomePayRedirectWithUrl:paymentUrl resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayAtomePayRedirectWithUrl", exception.description, nil);
  }
}

@end
