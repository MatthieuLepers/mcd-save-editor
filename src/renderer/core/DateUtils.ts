import i18n from '@renderer/plugins/i18n';

class DateUtils {
  d(date: Date): string {
    return `${date.getDate()}`.padStart(2, '0');
  }

  D(date: Date): string {
    const i18nDay = i18n.global.t(`Date.days[${date.getDay()}]`);
    const shortI18nDay = i18nDay.substring(0, 3);
    return shortI18nDay === i18nDay ? shortI18nDay : `${shortI18nDay}.`;
  }

  j(date: Date): number {
    return date.getDate();
  }

  l(date: Date): string {
    return i18n.global.t(`Date.days[${date.getDay()}]`);
  }

  N(date: Date): number {
    return date.getDay() + 1;
  }

  S(date: Date): string {
    const suffix = i18n.global.t(`Date.daySuffix[${date.getDate() - 1}]`) || null;
    return !!suffix && suffix !== `Date.daySuffix[${date.getDate() - 1}]`
      ? suffix
      : i18n.global.t('Date.defaultDaySuffix')
    ;
  }

  w(date: Date): number {
    return date.getDay();
  }

  F(date: Date): string {
    return i18n.global.t(`Date.months[${date.getMonth()}]`);
  }

  m(date: Date): string {
    return `${date.getMonth() + 1}`.padStart(2, '0');
  }

  M(date: Date): string {
    const i18nMonth = i18n.global.t(`Date.months[${date.getMonth()}]`);
    const shortI18nMonth = i18nMonth.substring(0, 4);
    return i18nMonth === shortI18nMonth ? shortI18nMonth : `${shortI18nMonth}.`;
  }

  n(date: Date): number {
    return date.getMonth() + 1;
  }

  t(date: Date): number {
    const data = [31, 27 + this.L(date), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return data[date.getMonth()];
  }

  L(date: Date): number {
    return ((date.getFullYear() % 100) !== 0 || (date.getFullYear() % 400) === 0) ? 1 : 0;
  }

  Y(date: Date): number {
    return date.getFullYear();
  }

  y(date: Date): number {
    return parseInt(`${date.getFullYear()}`.substring(2), 10);
  }

  G(date: Date): number {
    return date.getHours();
  }

  H(date: Date): string {
    return `${date.getHours()}`.padStart(2, '0');
  }

  i(date: Date): string {
    return `${date.getMinutes()}`.padStart(2, '0');
  }

  s(date: Date): string {
    return `${date.getSeconds()}`.padStart(2, '0');
  }

  format(date: Date, format: string): string {
    return format
      .split('')
      .map((letter) => (typeof this[letter as keyof this] === 'function' ? (this[letter as keyof this] as Function)(date) : letter))
      .join('')
    ;
  }
}

export default new DateUtils();
