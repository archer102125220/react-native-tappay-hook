import { renderHook, waitFor } from '@testing-library/react';

import * as hooks from '../hooks';

jest.mock('react-native');

describe('hooks test(throw)', () => {
  test('useSetDirectPayTPDCard() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useSetDirectPayTPDCard('3549134477691421', '07', '25', '465')
    );
    await waitFor(() =>
      expect(result.current).toMatchObject({
        isCardNumberValid: false,
        isExpiryDateValid: false,
        isCCVValid: false,
        isValid: false
      })
    );
  });

  test('useTPDGetDeviceId() test', async () => {
    const { result }: any = renderHook(() => hooks.useTPDGetDeviceId());
    await waitFor(() => expect(result.current).toBe(''));
  });

  test('useTPDGooglePay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDGooglePay('TEST MERCHANT NAME')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false, '']))
    );
  });

  test('useTPDApplePay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDApplePay(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDLinePay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDLinePay('linepayexample://tech.cherri')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDSamsungPay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDSamsungPay(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDJkoPay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDJkoPay('jkoexample://jko.uri:8888/test')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDEasyWallet() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDEasyWallet('https://google.com.tw')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDPiWallet() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDPiWallet('https://google.com.tw')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDPlusPay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDPlusPay(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDAtome() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDAtome('https://google.com.tw')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });
});
