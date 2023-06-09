import * as TappayFP from '../fp';

import {
  setInitPromise,
  setAppId,
  setAppKey,
  setGooglePlayIsReady,
  setApplePlayIsReady,
  setLinePlayIsReady,
  setSamsungPayIsReady,
  setJkoPayIsReady,
  setEasyWalletIsReady,
  setPiWalletIsReady,
  setPlusPayIsReady,
  setAtomeIsReady
} from '../cacheStatus';

jest.mock('react-native');

describe('TappayFP test(throw)', () => {
  const systemOS = 'jest';
  beforeEach(() => {
    require('react-native')._setInitInstanceSuccess(false);
    setInitPromise(null);
    setAppId(-1);
    setAppKey('');
    require('react-native')._setSystemOS(systemOS);
    require('react-native')._setGooglePlayIsReady(false);
    require('react-native')._setApplePlayIsReady(false);
    require('react-native')._setLinePlayIsReady(false);
    require('react-native')._setSamsungPayIsReady(false);
    require('react-native')._setJkoPayIsReady(false);
    require('react-native')._setEasyWalletIsReady(false);
    require('react-native')._setPiWalletIsReady(false);
    require('react-native')._setPlusPayIsReady(false);
    require('react-native')._setAtomeIsReady(false);
    require('react-native')._setLinePayError(true);
    require('react-native')._setLinePayCancel(false);
    require('react-native')._setSamsungPayError(true);
    require('react-native')._setSamsungPayCancel(false);
    require('react-native')._setJkoPayError(true);
    require('react-native')._setEasyWalletError(true);
    require('react-native')._setPiWalletError(true);
    require('react-native')._setPlusPayError(true);
    require('react-native')._setAtomePayError(true);

    setGooglePlayIsReady(false);
    setApplePlayIsReady(false);
    setLinePlayIsReady(false);
    setSamsungPayIsReady(false);
    setJkoPayIsReady(false);
    setEasyWalletIsReady(false);
    setPiWalletIsReady(false);
    setPlusPayIsReady(false);
    setAtomeIsReady(false);
  });

  test('tappayInit() test', () => {
    expect(
      TappayFP.tappayInit(128088, 'app_key', false) instanceof Promise
    ).toBe(true);
  });

  test('tappayInit() errorHandler test', () => {
    expect(
      TappayFP.tappayInit(128088, 'app_key', false, () => {}) instanceof Promise
    ).toBe(true);
  });

  test('getDeviceId() test', async () => {
    await expect(TappayFP.getDeviceId()).rejects.toThrow();
  });

  test('setDirectPayTPDCard() test', async () => {
    await expect(
      TappayFP.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
    ).rejects.toThrow();
  });

  test('getDirectPayPrime() test', async () => {
    await expect(TappayFP.getDirectPayPrime()).rejects.toThrow();
  });

  test('googlePayInit() test', async () => {
    await expect(
      TappayFP.googlePayInit('TEST MERCHANT NAME')
    ).rejects.toThrow();
  });

  test('getGooglePayPrime() test', async () => {
    await expect(TappayFP.getGooglePayPrime('1', 'TWD')).rejects.toThrow();
  });

  test('getGooglePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await TappayFP.tappayInit(128088, 'app_key', false);
    await expect(TappayFP.getGooglePayPrime('1')).rejects.toThrow();
  });

  test('isApplePayAvailable() test', async () => {
    await expect(TappayFP.isApplePayAvailable()).rejects.toThrow();
  });

  test('applePayInit() test', async () => {
    await expect(
      TappayFP.applePayInit(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    ).rejects.toThrow();
  });

  test('getApplePayPrime() test', async () => {
    await expect(TappayFP.getApplePayPrime('1')).rejects.toThrow();
  });

  test('getApplePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('ios');
    await TappayFP.tappayInit(128088, 'app_key', false);
    await expect(TappayFP.getApplePayPrime('1')).rejects.toThrow();
  });

  test('linePayHandleURL() test', async () => {
    await expect(TappayFP.linePayHandleURL('url')).rejects.toThrow();
  });

  test('isLinePayAvailable() test', async () => {
    await expect(TappayFP.isLinePayAvailable()).rejects.toThrow();
  });

  test('linePayInit() test', async () => {
    await expect(
      TappayFP.linePayInit('linepayexample://tech.cherri')
    ).rejects.toThrow('Tappay has not been initialized!');
  });

  test('getLinePayPrime() test', async () => {
    await expect(TappayFP.getLinePayPrime()).rejects.toThrow();
  });

  test('linePayRedirectWithUrl() test', async () => {
    setLinePlayIsReady(true);
    await expect(TappayFP.linePayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'mockError'
    );
    await expect(
      TappayFP.linePayRedirectWithUrl('paymentUrl', () => {})
    ).rejects.toThrow('mockError');
  });

  test('linePayRedirectWithUrl() test not ready', async () => {
    await expect(TappayFP.linePayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'TappayLinePay is not ready!'
    );
  });

  test('linePayRedirectWithUrl() test canceled', async () => {
    setLinePlayIsReady(true);
    require('react-native')._setLinePayCancel(true);
    require('react-native')._setLinePayError(false);
    await expect(TappayFP.linePayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'canceled'
    );
  });

  test('samsungPayInit() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(
      TappayFP.samsungPayInit(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).rejects.toThrow();
  });

  test('getSamsungPayPrime() test', async () => {
    require('react-native')._setSystemOS('android');
    setSamsungPayIsReady(true);
    await expect(
      TappayFP.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow('mockError');
  });

  test('getSamsungPayPrime() test not ready', async () => {
    require('react-native')._setSystemOS('android');
    await expect(
      TappayFP.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow('TappaySamsungPay is not ready!');
  });

  test('getSamsungPayPrime() test canceled', async () => {
    require('react-native')._setSystemOS('android');
    setSamsungPayIsReady(true);
    require('react-native')._setSamsungPayCancel(true);
    require('react-native')._setSamsungPayError(false);
    await expect(
      TappayFP.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow('canceled');
  });

  test('isJkoPayAvailable() test', async () => {
    await expect(TappayFP.isJkoPayAvailable()).rejects.toThrow();
  });

  test('jkoPayInit() test', async () => {
    await expect(
      TappayFP.jkoPayInit('jkoexample://jko.uri:8888/test')
    ).rejects.toThrow();
  });

  test('getJkoPayPrime() test', async () => {
    await expect(TappayFP.getJkoPayPrime()).rejects.toThrow();
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    setJkoPayIsReady(true);
    await expect(TappayFP.jkoPayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'mockError'
    );
    await expect(
      TappayFP.jkoPayRedirectWithUrl('paymentUrl', () => {})
    ).rejects.toThrow('mockError');
  });

  test('jkoPayRedirectWithUrl() test not ready', async () => {
    await expect(TappayFP.jkoPayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'TappayJkoPay is not ready!'
    );
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    await expect(TappayFP.jkoPayHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isEasyWalletAvailable() test', async () => {
    await expect(TappayFP.isEasyWalletAvailable()).rejects.toThrow();
  });

  test('easyWalletInit() test', async () => {
    await expect(
      TappayFP.easyWalletInit('https://google.com.tw')
    ).rejects.toThrow();
  });

  test('getEasyWalletPrime() test', async () => {
    await expect(TappayFP.getEasyWalletPrime()).rejects.toThrow(
      'TappayEasyWallet is not ready!'
    );
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    setEasyWalletIsReady(true);
    require('react-native')._setEasyWalletError(true);
    await expect(
      TappayFP.easyWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow('mockError');
    await expect(
      TappayFP.easyWalletRedirectWithUrl('paymentUrl', () => {})
    ).rejects.toThrow('mockError');
  });

  test('easyWalletRedirectWithUrl() test not ready', async () => {
    await expect(
      TappayFP.easyWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow('TappayEasyWallet is not ready!');
  });

  test('easyWalletHandleUniversalLink() test', async () => {
    await expect(
      TappayFP.easyWalletHandleUniversalLink('url')
    ).rejects.toThrow();
  });

  test('isPiWalletAvailable() test', async () => {
    await expect(TappayFP.isPiWalletAvailable()).rejects.toThrow();
  });

  test('piWalletInit() test', async () => {
    await expect(
      TappayFP.piWalletInit('https://google.com.tw')
    ).rejects.toThrow();
  });

  test('getPiWalletPrime() test', async () => {
    await expect(TappayFP.getPiWalletPrime()).rejects.toThrow();
  });

  test('piWalletRedirectWithUrl() test', async () => {
    setPiWalletIsReady(true);
    await expect(
      TappayFP.piWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow('mockError');
    await expect(
      TappayFP.piWalletRedirectWithUrl('paymentUrl', () => {})
    ).rejects.toThrow('mockError');
  });

  test('piWalletRedirectWithUrl() test not ready', async () => {
    await expect(
      TappayFP.piWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow('TappayPiWallet is not ready!');
  });

  test('piWalletHandleUniversalLink() test', async () => {
    await expect(TappayFP.piWalletHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isPlusPayAvailable() test', async () => {
    await expect(TappayFP.isPlusPayAvailable()).rejects.toThrow();
  });

  test('plusPayInit() test', async () => {
    await expect(
      TappayFP.plusPayInit(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).rejects.toThrow();
  });

  test('getPlusPayPrime() test', async () => {
    await expect(TappayFP.getPlusPayPrime()).rejects.toThrow();
  });

  test('plusPayRedirectWithUrl() test', async () => {
    setPlusPayIsReady(true);
    await expect(TappayFP.plusPayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'mockError'
    );
    await expect(
      TappayFP.plusPayRedirectWithUrl('paymentUrl', () => {})
    ).rejects.toThrow('mockError');
  });

  test('plusPayRedirectWithUrl() test not ready', async () => {
    await expect(TappayFP.plusPayRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'TappayPlusPay is not ready!'
    );
  });

  test('plusPayhandleUniversalLink() test', async () => {
    await expect(TappayFP.plusPayhandleUniversalLink('url')).rejects.toThrow();
  });

  test('isAtomeAvailable() test', async () => {
    await expect(TappayFP.isAtomeAvailable()).rejects.toThrow();
  });

  test('atomeInit() test', async () => {
    await expect(TappayFP.atomeInit('https://google.com.tw')).rejects.toThrow();
  });

  test('getAtomePrime() test', async () => {
    await expect(TappayFP.getAtomePrime()).rejects.toThrow(
      'TappayAtome is not ready!'
    );
  });

  test('atomeRedirectWithUrl() test', async () => {
    setAtomeIsReady(true);
    await expect(TappayFP.atomeRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'mockError'
    );
    await expect(
      TappayFP.atomeRedirectWithUrl('paymentUrl', () => {})
    ).rejects.toThrow('mockError');
  });

  test('atomeRedirectWithUrl() test not ready', async () => {
    await expect(TappayFP.atomeRedirectWithUrl('paymentUrl')).rejects.toThrow(
      'TappayAtome is not ready!'
    );
  });

  test('atomehandleUniversalLink() test', async () => {
    await expect(TappayFP.atomehandleUniversalLink('url')).rejects.toThrow();
  });
});
