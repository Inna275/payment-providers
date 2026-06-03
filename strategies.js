class PaymentStrategy {
  async pay(order) {
    throw new Error("Method 'pay()' must be implemented.");
  }
}

class ApplePayStrategy extends PaymentStrategy {
  async pay(order) {
    const fee = order.amount * 0.015;
    return {
      provider: 'Apple Pay',
      chargedAmount: order.amount + fee,
      fee,
      transactionId: crypto.randomUUID()
    };
  }
}

class GooglePayStrategy extends PaymentStrategy {
  async pay(order) {
    const fee = order.amount * 0.02;
    return {
      provider: 'Google Pay',
      chargedAmount: order.amount + fee,
      fee,
      transactionId: crypto.randomUUID()
    };
  }
}

class LiqPayStrategy extends PaymentStrategy {
  async pay(order) {
    const fee = 10;
    return {
      provider: 'LiqPay',
      chargedAmount: order.amount + fee,
      fee,
      transactionId: crypto.randomUUID()
    };
  }
}

export { ApplePayStrategy, GooglePayStrategy, LiqPayStrategy };
