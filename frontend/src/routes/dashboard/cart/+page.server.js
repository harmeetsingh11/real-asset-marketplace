// @ts-nocheck
import NeucronSDK from 'neucron-sdk';
import { parse } from 'cookie';
import { error, json } from '@sveltejs/kit';

export const actions = {
  pay: async ({ request }) => {
    try {
      // Extract cookie header from the request
      const cookieHeader = request.headers.get('cookie') || '';
      const cookies = parse(cookieHeader);

      // Access cookie values
      const userId = cookies.userId ? parseInt(cookies.userId, 10) : null;
      const token = cookies.token || '';

      if (!userId || !token) {
        return json({ message: 'User not authenticated.' }, { status: 400 });
      }

      // Parse form data
      const data = await request.formData();
      const cartItems = JSON.parse(data.get('items')); // Assuming 'items' is passed as a JSON string
      console.log(cartItems);

      if (!cartItems || cartItems.length === 0) {
        return json({ message: 'Cart items are required.' }, { status: 400 });
      }

      // Validate `items`
      if (
        !Array.isArray(cartItems) ||
        !cartItems.every((item) => typeof item === 'object')
      ) {
        throw new Error('Invalid data format');
      }

      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;
      const walletModule = neucron.wallet;

      const walletResponse = await fetch(
        `http://localhost:3000/wallet/get?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const walletData = await walletResponse.json();
      console.log(walletData);

      if (!walletResponse.ok || !walletData) {
        return json(
          { message: 'Failed to retrieve wallet details' },
          { status: 400 }
        );
      }

      // Login to the wallet
      const loginResponse = await authModule.login({
        email: walletData[0].walletEmail,
        password: walletData[0].walletPassword,
      });
      //   cartItems.forEach((item) => {
      //     console.log({
      //       address: item.paymailId,
      //       note: item.assetName,
      //       amount: item.price * item.qty,
      //     });
      //   });

      console.log(loginResponse);
      //   Login to wallet
      if (!loginResponse.success) {
        return json({ message: 'Failed to login to wallet' }, { status: 400 });
      }

      // Prepare transaction options
      const options = {
        outputs: cartItems.map((item) => ({
          address: item.paymailId,
          note: item.assetName,
          amount: item.price * item.qty,
        })),
      };

      // Process the payment
      const paymentResponse = await walletModule.send(options);
      console.log(paymentResponse);

      if (paymentResponse.success) {
        return json(
          {
            message: 'Payment successful',
            transactionId: paymentResponse.transactionId,
          },
          { status: 200 }
        );
      } else {
        return json(
          { message: 'Payment failed', reason: paymentResponse.error },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error('Payment error:', err);
      throw error(500, 'Internal Server Error');
    }
  },
};
