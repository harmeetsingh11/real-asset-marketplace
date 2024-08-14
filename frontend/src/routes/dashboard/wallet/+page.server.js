// @ts-nocheck
import NeucronSDK from 'neucron-sdk';

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return {
        status: 400,
        body: { error: 'Email and password are required.' },
      };
    }

    try {
      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;
      const walletModule = neucron.wallet;

      const loginResponse = await authModule.login({ email, password });
      console.log('Login response:', loginResponse);

      // For Default wallet balance
      const DefaultWalletBalance = await walletModule.getWalletBalance({});
      console.log('Default Wallet Balance:', DefaultWalletBalance);
      if (loginResponse.status_code == 200) {
        return {
          status: 200,
          body: { loginResponse, DefaultWalletBalance },
        };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return {
        status: 500,
        body: { error: 'Login failed. Please try again.' },
      };
    }
  },
};
