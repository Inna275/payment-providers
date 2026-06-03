import { ApplePayStrategy, GooglePayStrategy, LiqPayStrategy } from './strategies.js';

class CheckoutService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async checkout(order) {
    this.validateOrder(order);

    const paymentResult = await this.strategy.pay(order);

    console.log(
      `[PAYMENT] ${paymentResult.provider}: ${paymentResult.transactionId}`
    );

    return {
      orderId: order.id,
      ...paymentResult
    };
  }

  validateOrder(order) {
    if (!order.id) {
      throw new Error('Order id is required');
    }

    if (order.amount <= 0) {
      throw new Error('Amount must be positive');
    }
  }
}

function paymentFactory(method) {
  const strategies = {
    apple: ApplePayStrategy,
    google: GooglePayStrategy,
    liqpay: LiqPayStrategy,
  };

  const Strategy = strategies[method];

  if (!Strategy) {
    throw new Error('Unsupported payment method');
  }

  return new Strategy();
}

export { CheckoutService, paymentFactory };
