/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class RuneList {
  /**
   * @constructor
   * @param {String[]} runeList
   */
  constructor(runeList = []) {
    this.$list = runeList;
    this.compressed = this.$list.reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {});
  }

  /**
   * @param {RuneList} runeList
   * @return {Number}
   */
  countContains(runeList) {
    return Object.entries(runeList.compressed)
      .reduce((acc, [key, val]) => acc + (this.compressed[key] && this.compressed[key] >= val ? 1 : 0), 0)
    ;
  }

  /**
   * @param {RuneList} runeList
   * @return {RuneList}
   */
  add(runeList) {
    return new RuneList([...this.$list, ...runeList.$list]);
  }

  /**
   * @param {RuneList} runeList
   * @return {RuneList}
   */
  sub(runeList) {
    const result = [...this.$list];
    runeList.$list.forEach((rune) => {
      if (result.includes(rune)) {
        result.splice(result.indexOf(rune), 1);
      }
    });
    return new RuneList(result);
  }

  /**
   * @param {RuneList} runeList
   * @return {RuneList}
   */
  merge(runeList) {
    const groupedRunes = [this.compressed, runeList.compressed]
      .reduce((acc, val) => {
        Object.entries(val).forEach(([rune, amount]) => { acc[rune] = Math.max(acc[rune] || 0, amount); });
        return acc;
      }, {})
    ;

    return new RuneList(Object.entries(groupedRunes).reduce((acc, [key, val]) => acc.concat([...Array(val).keys()].map(() => key)), []));
  }

  /**
   * @return {Boolean}
   */
  isEmpty() {
    return this.$list.length === 0;
  }

  /**
   * @return {Number}
   */
  get length() {
    return this.$list.length;
  }
}
