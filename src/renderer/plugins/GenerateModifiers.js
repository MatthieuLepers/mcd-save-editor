/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default {
  install(Vue) {
    Vue.prototype.GenerateModifiers = (baseClass, modifiers = {}) => Object.entries(modifiers)
      .filter(([, value]) => !!value)
      .reduce((acc, [key]) => `${acc} ${baseClass}--${key}`, baseClass)
    ;
  },
};
