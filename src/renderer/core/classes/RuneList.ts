export default class RuneList {
  public list: Array<string>;

  public compressed: Record<string, number> = {};

  constructor(runeList?: Array<string>) {
    this.list = runeList ?? [];
    this.compressed = this.list.reduce((acc, val) => ({
      ...acc,
      [val]: (acc[val] ?? 0) + 1,
    }), {});
  }

  countContains(runeList: RuneList): number {
    return Object.entries(runeList.compressed)
      .reduce((acc, [key, val]) => acc + (this.compressed[key] && this.compressed[key] >= val ? 1 : 0), 0)
    ;
  }

  add(runeList: RuneList): RuneList {
    return new RuneList([...this.list, ...runeList.list]);
  }

  sub(runeList: RuneList): RuneList {
    const result = [...this.list];
    runeList.list.forEach((rune) => {
      if (result.includes(rune)) {
        result.splice(result.indexOf(rune), 1);
      }
    });
    return new RuneList(result);
  }

  merge(runeList: RuneList): RuneList {
    const groupedRunes = [this.compressed, runeList.compressed]
      .reduce((acc, val) => {
        Object.entries(val).forEach(([rune, amount]) => { acc[rune] = Math.max(acc[rune] || 0, amount); });
        return acc;
      }, {})
    ;

    return new RuneList(Object.entries(groupedRunes).reduce((acc, [key, val]) => acc.concat([...Array(val).keys()].map(() => key)), [] as Array<string>));
  }

  isEmpty(): boolean {
    return this.list.length === 0;
  }

  get length(): number {
    return this.list.length;
  }
}
