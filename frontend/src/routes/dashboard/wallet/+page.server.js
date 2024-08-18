// @ts-nocheck
import NeucronSDK from 'neucron-sdk';
import { authStore } from '$lib/stores/authStore.js';
import { get } from 'svelte/store';
import { parse } from 'cookie';

export const actions = {
  signup: async ({ request }) => {
    /// Extract cookie header from the request
    const cookieHeader = request.headers.get('cookie') || '';

    // Parse cookies from the header
    const cookies = parse(cookieHeader);

    // Access cookie values
    const userId = cookies.userId ? parseInt(cookies.userId, 10) : null;
    const token = cookies.token || '';

    // console.log('UserID:', userId);
    // console.log('Token:', token);

    const data = await request.formData();
    const walletEmail = data.get('walletEmail');
    const walletPassword = data.get('walletPassword');

    if (!walletEmail || !walletPassword) {
      return {
        status: 400,
        body: { error: 'Email and password are required.' },
      };
    }

    try {
      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;
      const walletModule = neucron.wallet;

      const signUpResponse = await authModule.signUp({
        email: walletEmail,
        password: walletPassword,
      });

      console.log(signUpResponse);
      if (signUpResponse.status_code === 200) {
        const walletAddress = signUpResponse.data.wallet_address;
        const paymailId = signUpResponse.data.paymail_id;

        // Make an API call to store the wallet details in the database
        const saveWalletResponse = await fetch(
          'http://localhost:3000/wallet/create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              walletEmail,
              walletPassword,
              paymailId,
              address: walletAddress,
              userId,
            }),
          }
        );

        if (saveWalletResponse.ok) {
          const savedWalletData = await saveWalletResponse.json();
          console.log('Wallet saved successfully:', savedWalletData);

          return {
            success: true,
            userId,
            walletAddress,
            paymailId,
            walletEmail,
            walletPassword,
          };
        } else {
          console.error(
            'Failed to save wallet:',
            saveWalletResponse.statusText
          );
          return {
            status: 500,
            error: 'Failed to save wallet. Please try again.',
          };
        }
      } else {
        return {
          status: signUpResponse.status_code,
          error: signUpResponse.message,
        };
      }
    } catch (error) {
      console.error('Signup failed:', error);
      return {
        status: 500,
        error: `Signup failed. Please try again. ${error} `,
      };
    }
  },
};
