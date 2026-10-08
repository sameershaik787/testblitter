// Base exchange rates against USD (Sample rates)
const EXCHANGE_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 155.2
};

/**
 * Converts an amount from one currency to another.
 * @param {number} amount
 * @param {string} fromCurrency
 * @param {string} toCurrency
 * @param {object} rates
 * @returns {number}
 */
function convertCurrency(amount, fromCurrency, toCurrency, rates = EXCHANGE_RATES) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    throw new Error('Amount must be a non-negative number');
  }
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error(`Unsupported currency conversion: ${fromCurrency} to ${toCurrency}`);
  }

  // Convert to USD base first, then to target currency
  const inUSD = amount / rates[fromCurrency];
  const converted = inUSD * rates[toCurrency];
  return Number(converted.toFixed(4));
}

/**
 * Calculates tax on a given base amount.
 * @param {number} amount
 * @param {number} taxRatePercentage
 * @returns {number}
 */
function calculateTax(amount, taxRatePercentage) {
  if (amount < 0 || taxRatePercentage < 0) {
    throw new Error('Amount and tax rate must be non-negative');
  }
  return Number(((amount * taxRatePercentage) / 100).toFixed(2));
}

/**
 * Calculates final price after applying a percentage discount.
 * @param {number} amount
 * @param {number} discountPercentage
 * @returns {number}
 */
function calculateDiscount(amount, discountPercentage) {
  if (amount < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Invalid discount arguments');
  }
  const discountAmount = (amount * discountPercentage) / 100;
  return Number((amount - discountAmount).toFixed(2));
}

/**
 * Formats a currency number with symbol or code.
 * @param {number} val
 * @param {string} currency
 * @returns {string}
 */
function formatCurrency(val, currency) {
  return `${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

// DOM Binding for Browser Environment
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    const swapBtn = document.getElementById('swapBtn');
    const convertBtn = document.getElementById('convertBtn');
    const resultValue = document.getElementById('resultValue');
    const rateInfo = document.getElementById('rateInfo');
    const taxRateInput = document.getElementById('taxRate');
    const discountRateInput = document.getElementById('discountRate');
    const taxDiscountSummary = document.getElementById('taxDiscountSummary');

    function performConversion() {
      const amount = parseFloat(amountInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;

      if (isNaN(amount) || amount <= 0) {
        resultValue.textContent = 'Please enter a valid amount';
        rateInfo.textContent = '';
        return;
      }

      try {
        const result = convertCurrency(amount, from, to);
        resultValue.textContent = formatCurrency(result, to);

        const singleUnitRate = convertCurrency(1, from, to);
        rateInfo.textContent = `1 ${from} = ${singleUnitRate} ${to}`;

        // Quick tax & discount summary
        const taxRate = parseFloat(taxRateInput.value) || 0;
        const discountRate = parseFloat(discountRateInput.value) || 0;

        const tax = calculateTax(result, taxRate);
        const afterDiscount = calculateDiscount(result, discountRate);
        const totalWithTax = Number((afterDiscount + tax).toFixed(2));

        taxDiscountSummary.innerHTML = `
          After ${discountRate}% Discount: <strong>${formatCurrency(afterDiscount, to)}</strong><br />
          Estimated Tax (${taxRate}%): <strong>+${formatCurrency(tax, to)}</strong><br />
          Final Estimated Total: <strong>${formatCurrency(totalWithTax, to)}</strong>
        `;
      } catch (err) {
        resultValue.textContent = 'Error: ' + err.message;
      }
    }

    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        performConversion();
      });
    }

    if (convertBtn) {
      convertBtn.addEventListener('click', performConversion);
    }

    // Auto-calculate on input changes
    [amountInput, fromSelect, toSelect, taxRateInput, discountRateInput].forEach((el) => {
      if (el) el.addEventListener('input', performConversion);
    });

    // Initial run
    performConversion();
  });
}

// Export for Node / CI Unit Tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXCHANGE_RATES,
    convertCurrency,
    calculateTax,
    calculateDiscount,
    formatCurrency
  };
}
