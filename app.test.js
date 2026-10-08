const test = require('node:test');
const assert = require('node:assert');
const {
  EXCHANGE_RATES,
  convertCurrency,
  calculateTax,
  calculateDiscount,
  formatCurrency
} = require('./app.js');

test('Currency Calculator Test Suite', async (t) => {
  await t.test('converts USD to INR accurately', () => {
    const result = convertCurrency(100, 'USD', 'INR');
    assert.strictEqual(result, 8350);
  });

  await t.test('converts same currency with 1:1 ratio', () => {
    const result = convertCurrency(50, 'USD', 'USD');
    assert.strictEqual(result, 50);
  });

  await t.test('converts EUR to GBP accurately', () => {
    // 100 EUR -> (100 / 0.92) * 0.79 = 85.8696
    const result = convertCurrency(100, 'EUR', 'GBP');
    assert.strictEqual(typeof result, 'number');
    assert.ok(result > 85 && result < 87);
  });

  await t.test('throws error for invalid currency codes', () => {
    assert.throws(() => {
      convertCurrency(100, 'XYZ', 'USD');
    }, /Unsupported currency/);
  });

  await t.test('throws error for negative amount', () => {
    assert.throws(() => {
      convertCurrency(-50, 'USD', 'INR');
    }, /must be a non-negative number/);
  });

  await t.test('calculates sales tax correctly', () => {
    const tax = calculateTax(1000, 18);
    assert.strictEqual(tax, 180.00);
  });

  await t.test('calculates discount correctly', () => {
    const discounted = calculateDiscount(200, 20);
    assert.strictEqual(discounted, 160.00);
  });

  await t.test('throws error on invalid discount percentage', () => {
    assert.throws(() => {
      calculateDiscount(100, 150);
    }, /Invalid discount arguments/);
  });

  await t.test('formats currency properly', () => {
    const formatted = formatCurrency(1234.5, 'USD');
    assert.ok(formatted.includes('1,234.50 USD') || formatted.includes('1234.50 USD'));
  });
});
