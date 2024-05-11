import type { App } from 'vue';

export default function (app: App<HTMLElement>) {
  app.config.globalProperties.GenerateModifiers = (baseClass: string, modifiers = {}) => Object.entries(modifiers)
    .filter(([, value]) => !!value)
    .reduce((acc, [key]) => `${acc} ${baseClass}--${key}`, baseClass)
  ;
  return app;
}
