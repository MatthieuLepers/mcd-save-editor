import type { App } from 'vue';

import DateUtils from '@renderer/core/DateUtils';

export default function (app: App<HTMLElement>) {
  app.config.globalProperties.dateFormat = (date: Date, format: string) => DateUtils.format(date, format);
  return app;
}
