//
//  TappayManager.h
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/3/21.
//
#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>
#import <TPDirect/TPDirect.h>
#import <React/RCTBridgeModule.h>
#import <AdSupport/ASIdentifierManager.h>

@interface TappayManager : NSObject

@property () NSNumber *APP_ID;
@property () NSString *APP_KEY;
@property () BOOL *prod;
@property () NSString *cardNumber;
@property () NSString *dueMonth;
@property () NSString *dueYear;
@property () NSString *CCV;
@property () NSString *SDKVersion;
@property () BOOL *applePayIsReadyToPay;
@property (nonatomic, strong) TPDMerchant *TPDmerchant;
@property (nonatomic, strong) TPDConsumer *TPDconsumer;
@property (nonatomic, strong) TPDCart *TPDcart;
@property (nonatomic, strong) TPDApplePay *TPDapplePay;
@property () RCTPromiseResolveBlock applePayJsResolve;
@property () RCTPromiseRejectBlock applePayJsReject;
@property (nonatomic, strong) TPDLinePay *TPDlinePay;
@property () NSString *linePayCallbackUri;
@property () BOOL *linePayIsReadyToPay;
@property () RCTPromiseResolveBlock linePayJsResolve;
@property () RCTPromiseRejectBlock linePayJsReject;

- (void)initInstance:(NSNumber *)APP_ID APP_KEY:(NSString *)APP_KEY prod:(BOOL)prod;

- (id)TPDCard:(NSString *)cardNumber dueMonth:(NSString *)dueMonth dueYear:(NSString *)dueYear CCV:(NSString *)CCV;

- (void)getDirectPayPrime:(NSString *)geoLocation resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (NSString *)getDeviceId;

- (NSString *)cardTypeToString:(CardType)cardType;

- (void)applePayInit:(NSString *)merchantName merchantId:(NSString *)merchantId countryCode:(NSString *)countryCode currencyCode:(NSString *)currencyCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (BOOL)isApplePayAvailable;

- (void)getApplePayPrime:(NSString *)amount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (void)tappayLinePayExceptionHandler:(NSNotification *)notification;

- (BOOL)linePayHandleURL:(NSString *)openUri;

- (BOOL)isLinePayAvailable;

- (BOOL)linePayInit:(NSString *)linePayCallbackUri;

- (void)linePayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (void)getLinePayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

@end

@interface TPDApplePayDelegate:NSObject

@property () NSString *SDKVersion;
@property (nonatomic, strong) TPDMerchant *TPDmerchant;
@property (nonatomic, strong) TPDConsumer *TPDconsumer;
@property (nonatomic, strong) TPDCart *TPDcart;
@property (nonatomic, strong) TPDApplePay *TPDapplePay;
@property () RCTPromiseResolveBlock applePayJsResolve;
@property () RCTPromiseRejectBlock applePayJsReject;

// Apple Pay On Start
- (void)tpdApplePayDidStartPayment:(TPDApplePay *)applePay;

// Apple Pay Did Success
- (void)tpdApplePay:(TPDApplePay *)applePay didSuccessPayment:(TPDTransactionResult *)result;

// Apple Pay Did Failure
- (void)tpdApplePay:(TPDApplePay *)applePay didFailurePayment:(TPDTransactionResult *)result;

// Apple Pay Did Cancel
- (void)tpdApplePayDidCancelPayment:(TPDApplePay *)applePay;

// Apple Pay Did Finish
- (void)tpdApplePayDidFinishPayment:(TPDApplePay *)applePay;

// didSelectShippingMethod
- (void)tpdApplePay:(TPDApplePay *)applePay didSelectShippingMethod:(PKShippingMethod *)shippingMethod;

// didSelectPaymentMethod
- (TPDCart *)tpdApplePay:(TPDApplePay *)applePay didSelectPaymentMethod:(PKPaymentMethod *)paymentMethod cart:(TPDCart *)cart;

// canAuthorizePaymentWithShippingContact
- (BOOL)tpdApplePay:(TPDApplePay *)applePay canAuthorizePaymentWithShippingContact:(PKContact *)shippingContact;

// didReceivePrime
- (void)tpdApplePay:(TPDApplePay *)applePay didReceivePrime:(NSString *)prime withExpiryMillis:(long)expiryMillis withCardInfo:(TPDCardInfo *)cardInfo withMerchantReferenceInfo:(NSDictionary *)merchantReferenceInfo;

@end

