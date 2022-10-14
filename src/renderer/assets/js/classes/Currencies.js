/**
 * @param {String} name
 * @return {Object|null}
 */
function $getCurrency(name) {
  const [currency] = this.$data.filter(({ type }) => type === name);
  return currency || null;
}

/**
 * @param {String} name
 * @return {Boolean}
 */
function $currencyExists(name) {
  return $getCurrency.call(this, name) !== null;
}

/**
 * @param {String} name
 * @param {Number} count
 */
function $setCurrencyCount(name, count) {
  if (!$currencyExists.call(this, name)) {
    this.$data.push({ type: name, count: Math.max(0, parseInt(count, 10)) });
  } else {
    $getCurrency.call(this, name).count = Math.max(0, parseInt(count, 10));
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Currencies {
  /**
   * @constructor
   * @param {Object[]} data
   */
  constructor(data) {
    this.$data = data;
  }

  /**
   * @return {Number}
   */
  get Emerald() {
    return $currencyExists.call(this, 'Emerald') ? $getCurrency.call(this, 'Emerald').count : 0;
  }

  /**
   * @param {Number} value
   */
  set Emerald(value) {
    $setCurrencyCount.call(this, 'Emerald', value);
  }

  /**
   * @return {Number}
   */
  get Gold() {
    return $currencyExists.call(this, 'Gold') ? $getCurrency.call(this, 'Gold').count : 0;
  }

  /**
   * @param {Number} value
   */
  set Gold(value) {
    $setCurrencyCount.call(this, 'Gold', value);
  }
}
