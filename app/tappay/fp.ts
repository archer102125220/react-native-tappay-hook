import { Platform } from 'react-native';

import Tappay from './TappayManager';

export function tappayInitialization(
  appId: number,
  appKey: string,
  prod: boolean
) {
  if (Tappay.initPromise !== null) {
    return Tappay.initPromise;
  }

  Tappay.initPromise = (async () => {
    await Tappay.init(appId, appKey, prod);
    return await Tappay.getDeviceId();
  })();

  return Tappay.initPromise;
}

export async function getTappayDeviceId() {
  const _deviceId = await Tappay.getDeviceId();
  return _deviceId;
}

export async function getDirectPayPrime(geoLocation: string = 'UNKNOWN') {
  const result = await Tappay.getDirectPayPrime(geoLocation);
  return result;
}

export async function getGooglePayPrime(
  totalPrice: string,
  currencyCode: string = 'TWD'
) {
  if (Platform.OS !== 'android') {
    return;
  }
  const result = await Tappay.getGooglePayPrime(totalPrice, currencyCode);
  return result;
}

export async function getApplePayPrime(amount: string) {
  if (Platform.OS !== 'ios') {
    return;
  }
  const result = await Tappay.getApplePayPrime(amount);

  return result;
}

export async function linePayHandleURL(openUri: string) {
  return await Tappay.linePayHandleURL(openUri);
}

export async function isLinePayAvailable() {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }
  return await Tappay.isLinePayAvailable();
}

export async function linePayInit(linePayCallbackUri: string) {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await Tappay.linePayInit(linePayCallbackUri);
  return result;
}

export async function linePayRedirectWithUrl(paymentUrl: string) {
  const result = await Tappay.linePayRedirectWithUrl(paymentUrl);
  return result;
}

export async function getLinePayPrime() {
  const result = await Tappay.getLinePayPrime();
  return result;
}

export async function samsungPayInit(
  merchantName: string,
  merchantId: string,
  currencyCode: string,
  serviceId: string
) {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }
  if (Platform.OS !== 'android') {
    return;
  }

  const result = await Tappay.samsungPayInit(
    merchantName,
    merchantId,
    currencyCode,
    serviceId
  );

  return result;
}

export async function getSamsungPayPrime(
  itemTotalAmount: string,
  shippingPrice: string,
  tax: string,
  totalAmount: string
) {
  const result = await Tappay.getSamsungPayPrime(
    itemTotalAmount,
    shippingPrice,
    tax,
    totalAmount
  );
  return result;
}

export async function jkoPayInit(jkoPayUniversalLinks: string) {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await Tappay.jkoPayInit(jkoPayUniversalLinks);
  return result;
}

export async function getJkoPayPrime() {
  const result = await Tappay.getJkoPayPrime();
  return result;
}

export async function jkoPayRedirectWithUrl(paymentUrl: string) {
  const result = await Tappay.jkoPayRedirectWithUrl(paymentUrl);
  return result;
}

export async function easyWalletInit(easyWalletUniversalLinks: string) {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await Tappay.easyWalletInit(easyWalletUniversalLinks);
  return result;
}

export async function getEasyWalletPrime() {
  const result = await Tappay.getEasyWalletPrime();
  return result;
}

export async function easyWalletRedirectWithUrl(paymentUrl: string) {
  const result = await Tappay.easyWalletRedirectWithUrl(paymentUrl);
  return result;
}
