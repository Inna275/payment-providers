import { CheckoutService, paymentFactory } from './checkout.js';

async function main() {
  const order = {
    id: 'ORD-1001',
    amount: 1500
  };

  const strategy = paymentFactory('google');

  const checkoutService = new CheckoutService(strategy);

  const result = await checkoutService.checkout(order);

  console.log(result);
}

main().catch(console.error);
