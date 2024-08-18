import NeucronSDK from 'neucron-sdk';

export const actions = {
  signup: async ({ request }) => {
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
        // Assuming the signUpResponse contains walletAddress and paymailId
        const walletAddress = signUpResponse.data.wallet_address;
        const paymailId = signUpResponse.data.paymail_id;

        return {
          success: true,
          walletAddress,
          paymailId,
          walletEmail,
          walletPassword,
        };
      } else {
        return {
          status: signUpResponse.status_code,
          body: { error: signUpResponse.message },
        };
      }
    } catch (error) {
      console.error('Signup failed:', error);
      return {
        status: 500,
        body: { error: 'Signup failed. Please try again.' },
      };
    }
  },
};
