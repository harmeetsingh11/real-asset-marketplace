// @ts-nocheck
import { json, error } from '@sveltejs/kit';
import NeucronSDK from 'neucron-sdk';
import { parse } from 'cookie';

export async function POST({ request }) {
  try {
    // Parse the JSON body
    const { items } = await request.json();

    // Extract cookie header from the request
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);

    // Access cookie values
    const userId = cookies.userId ? parseInt(cookies.userId, 10) : null;
    const token = cookies.token || '';

    if (!userId || !token) {
      return json({ message: 'User not authenticated.' }, { status: 400 });
    }

    // Validate `items`
    if (
      !Array.isArray(items) ||
      !items.every((item) => typeof item === 'object')
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
    console.log('Wallet Data', walletData);

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

    console.log('loginResponse', loginResponse);

    if (loginResponse.status_code !== 200) {
      return json({ message: 'Failed to login to wallet' }, { status: 400 });
    }

    // For Default wallet balance
    const DefaultWalletBalance = await walletModule.getWalletBalance({});
    const walletBalanceSummary = DefaultWalletBalance.data.balance.summary;
    console.log('Wallet Balance Summary:', walletBalanceSummary);

    // Prepare transaction options
    const options = {
      outputs: items.map((item) => ({
        address: item.paymailId,
        note: item.assetName,
        amount: item.price * item.qty,
      })),
    };

    console.log('Transaction options', options);

    const totalAmount = options.outputs.reduce(
      (acc, output) => acc + output.amount,
      0
    );

    console.log('Total Amount:', totalAmount);

    // Check if the wallet balance is sufficient
    if (walletBalanceSummary < totalAmount) {
      return json(
        {
          message: `Insufficient balance. Wallet balance is ${walletBalanceSummary}`,
        },
        { status: 500 }
      );
    }

    // Process the payment
    const paymentResponse = await neucron.pay.txSpend(options);
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
        { message: `Payment failed', ${paymentResponse.error}` },
        { status: 500 }
      );
    }
  } catch (err) {
    // console.error('Payment error:', err);
    throw error(500, `Internal Server Error ${err}`);
  }
}
