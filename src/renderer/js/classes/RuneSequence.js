/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class RuneSequence {
  /**
   * @constructor
   * @param {String[]} runeList
   */
  constructor(runeList) {
    this.$runeList = runeList;
    this.sequence = this.$runeList.reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {});
  }

  /**
   * @param {RuneSequence} runeSequence
   * @return {Number}
   */
  countContains(runeSequence) {
    return Object.entries(runeSequence.sequence).reduce((acc, [key, val]) => acc + (this.sequence[key] && this.sequence[key] >= val ? 1 : 0), 0);
  }

  /**
   * @param {RuneSequence} runeSequence
   * @return {RuneSequence}
   */
  sub(runeSequence) {
    const result = [...this.$runeList];
    runeSequence.$runeList.forEach((rune) => {
      if (result.includes(rune)) {
        result.splice(result.indexOf(rune), 1);
      }
    });
    return new RuneSequence(result);
  }

  /**
   * @param {RuneSequence} runeSequence
   * @return {RuneSequence}
   */
  add(runeSequence) {
    const groupedRunes = [this.sequence, runeSequence.sequence]
      .reduce((acc, val) => {
        Object.entries(val).forEach(([rune, amount]) => { acc[rune] = Math.max(acc[rune] || 0, amount); });
        return acc;
      }, {})
    ;

    return new RuneSequence(Object.entries(groupedRunes).reduce((acc, [key, val]) => acc.concat([...Array(val).keys()].map(() => key)), []));
  }

  /**
   * @return {Boolean}
   */
  isEmpty() {
    return this.$runeList.length === 0;
  }

  /**
   * @return {Number}
   */
  get length() {
    return this.$runeList.length;
  }
}
