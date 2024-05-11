export interface ICurrency {
  type: string;
  count: number;
}

export default class Currencies {
  constructor(public data: Array<ICurrency>) {
  }

  get Emerald(): number {
    return this.currencyExists('Emerald') ? (this.getCurrency('Emerald')?.count ?? 0) : 0;
  }

  set Emerald(value: string) {
    this.setCurrencyCount('Emerald', value);
  }

  get Gold(): number {
    return this.currencyExists('Gold') ? (this.getCurrency('Gold')?.count ?? 0) : 0;
  }

  set Gold(value: string) {
    this.setCurrencyCount('Gold', value);
  }

  getCurrency(name: string): ICurrency | null {
    const [currency] = this.data.filter(({ type }) => type === name);
    return currency || null;
  }

  currencyExists(name: string): boolean {
    return this.getCurrency(name) !== null;
  }

  setCurrencyCount(name: string, count: string) {
    if (!this.currencyExists(name)) {
      this.data.push({ type: name, count: Math.max(0, parseInt(count, 10)) });
    } else {
      const currency = this.getCurrency(name);
      if (currency) {
        currency.count = Math.max(0, parseInt(count, 10));
      }
    }
  }
}
