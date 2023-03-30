import { Platform, NativeModules } from 'react-native';

export class tappay {
  public initPromise: any = null;
  public deviceId: string = '';
  public googlePlayIsReady: boolean = false;
  public applePlayIsReady: boolean = false;
  public linePlayIsReady: boolean = false;

  public init(appId: number, appKey: string, prod: boolean) {
    this.initPromise = (async () => {
      try {
        if (this.initPromise !== null) {
          return this.deviceId;
        }
        await NativeModules.RNToolsManager.TappayInitInstance(
          appId,
          appKey,
          prod
        );
        return await this.getDeviceId();
      } catch (error: any) {
        console.log({ ...error });
      }
    })();

    return this.initPromise;
  }

  public async getDeviceId() {
    try {
      if (this.deviceId !== '') {
        return this.deviceId;
      }
      const deviceId = await NativeModules.RNToolsManager.TappayGetDeviceId();
      this.deviceId = deviceId;
      return deviceId;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async setDirectPayTPDCard(
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) {
    try {
      const validationResult =
        await NativeModules.RNToolsManager.TappaySetTPDCard(
          cardNumber,
          dueMonth,
          dueYear,
          CCV
        );

      return validationResult;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async handlerDirectPay(geoLocation: string = 'UNKNOWN') {
    try {
      const result = await NativeModules.RNToolsManager.TappayHandlerDirectPay(
        geoLocation
      );
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async googlePayInit(merchantName: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    try {
      const result = await NativeModules.RNToolsManager.TappayGooglePayInit(
        merchantName
      );
      this.googlePlayIsReady = result.isReadyToPay;
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async handlerGooglePay(
    totalPrice: string,
    currencyCode: string = 'TWD'
  ) {
    if (Platform.OS !== 'android') {
      return;
    }
    if (this.googlePlayIsReady !== true) {
      throw new Error('TappayGooglePay has not been initialized!');
    }
    try {
      const result = await NativeModules.RNToolsManager.TappayHandlerGooglePay(
        totalPrice,
        currencyCode
      );
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async isApplePayAvailable() {
    return await NativeModules.RNToolsManager.TappayIsApplePayAvailable();
  }

  public async applePayInit(
    merchantName: string,
    merchantId: string,
    countryCode: string,
    currencyCode: string
  ) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }

    try {
      const result = await NativeModules.RNToolsManager.TappayAapplePayInit(
        merchantName,
        merchantId,
        countryCode,
        currencyCode
      );
      this.applePlayIsReady = result.isReadyToPay;
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async handlerApplePay(amount: string) {
    if (Platform.OS !== 'ios') {
      return;
    }
    if (this.applePlayIsReady !== true) {
      throw new Error('TappayApplePay has not been initialized!');
    }
    try {
      const result = await NativeModules.RNToolsManager.TappayHandlerApplePay(
        amount
      );
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async linePayHandleURL(openUri:string) {
    return await NativeModules.RNToolsManager.TappayLinePayHandleURL(openUri);
  }

  public async isLinePayAvailable() {
    return await NativeModules.RNToolsManager.TappayIsLinePayAvailable();
  }

  public async linePayInit(linePayCallbackUri: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }

    try {
      const result = await NativeModules.RNToolsManager.TappayLinePayInit(
        linePayCallbackUri
      );
      this.linePlayIsReady = result.isReadyToPay;
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw error;
    }
  }

  public async handlerLinePay(paymentUrl: string) {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay has not been initialized!');
    }
    try {
      const result = await NativeModules.RNToolsManager.TappayHandlerLinePay(
        paymentUrl
      );
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async getLinePayPrime() {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay has not been initialized!');
    }
    try {
      const result = await NativeModules.RNToolsManager.TappayGetLinePayPrime();
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async linePayRedirectWithUrl(paymentUrl: string) {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay has not been initialized!');
    }
    try {
      const result =
        await NativeModules.RNToolsManager.TappayLinePayRedirectWithUrl(
          paymentUrl
        );
      return result;
    } catch (error: any) {
      console.log({ ...error });
      throw { ...error };
    }
  }

  public async directPayTest() {
    try {
      const validationResult = await this.setDirectPayTPDCard(
        '4679270817026199',
        '08',
        '25',
        '081'
      );
      console.log(validationResult);

      console.log(this.deviceId);
      const result = await this.handlerDirectPay();
      console.log(result);
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async googlePayTest(merchantName: string) {
    const { isReadyToPay } = await this.googlePayInit(merchantName);
    if (isReadyToPay === true) {
      const result = await this.handlerGooglePay('1', 'TWD');
      console.log({ result });
    }
  }

  public async applePayTest(
    merchantName: string,
    merchantId: string,
    countryCode: string,
    currencyCode: string
  ) {
    const { isReadyToPay } = await this.applePayInit(
      merchantName,
      merchantId,
      countryCode,
      currencyCode
    );
    if (isReadyToPay === true) {
      const result = await Tappay.handlerApplePay('1');
      console.log(result);
    }
  }

  public async linePayTest(linePayCallbackUri: string) {
    const { isReadyToPay } = await this.linePayInit(linePayCallbackUri);
    if (isReadyToPay === true) {
      const result = await Tappay.getLinePayPrime();
      console.log({ result });
    }
  }
}

export const Tappay = new tappay();

export default Tappay;