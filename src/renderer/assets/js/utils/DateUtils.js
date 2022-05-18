import i18n from '@/plugins/i18n';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 * @documentation : https://www.php.net/manual/fr/datetime.format.php
 */
class DateUtils {
  /**
   * @param {Date} date
   * @return {String}
   */
  d(date) {
    return `${date.getDate()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  D(date) {
    const i18nDay = i18n.t(`Date.days[${date.getDay()}]`);
    const shortI18nDay = i18nDay.substr(0, 3);
    return shortI18nDay === i18nDay ? shortI18nDay : `${shortI18nDay}.`;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  j(date) {
    return date.getDate();
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  l(date) {
    return i18n.t(`Date.days[${date.getDay()}]`);
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  N(date) {
    return date.getDay() + 1;
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  S(date) {
    const suffix = i18n.t('Date.daySuffix')[date.getDate() - 1] || null;
    return suffix || i18n.t('Date.defaultDaySuffix');
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  w(date) {
    return date.getDay();
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  F(date) {
    return i18n.t(`Date.months[${date.getMonth()}]`);
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  m(date) {
    return `${date.getMonth() + 1}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  M(date) {
    const i18nMonth = i18n.t(`Date.months[${date.getMonth()}]`);
    const shortI18nMonth = i18nMonth.substr(0, 4);
    return i18nMonth === shortI18nMonth ? shortI18nMonth : `${shortI18nMonth}.`;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  n(date) {
    return date.getMonth() + 1;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  t(date) {
    const data = [31, 27 + this.L(date), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return data[date.getMonth()];
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  L(date) {
    return ((date.getFullYear() % 100) !== 0 || (date.getFullYear() % 400) === 0) ? 1 : 0;
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  Y(date) {
    return date.getFullYear();
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  y(date) {
    return parseInt(`${date.getFullYear()}`.substr(2, 2), 10);
  }

  /**
   * @param {Date} date
   * @return {Number}
   */
  G(date) {
    return date.getHours();
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  H(date) {
    return `${date.getHours()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  i(date) {
    return `${date.getMinutes()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @return {String}
   */
  s(date) {
    return `${date.getSeconds()}`.padStart(2, '0');
  }

  /**
   * @param {Date} date
   * @param {String} format
   * @return {String}
   */
  format(date, format) {
    return format
      .split('')
      .map((letter) => (typeof this[letter] === 'function' ? this[letter](date) : letter))
      .join('')
    ;
  }
}

export default new DateUtils();
