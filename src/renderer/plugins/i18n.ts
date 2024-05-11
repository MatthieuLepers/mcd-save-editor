import { createI18n } from 'vue-i18n';
import i18n from '@renderer/i18n';

const VueI18n = createI18n({
  locale: 'en-EN',
  allowComposition: true,
  messages: i18n,
  globalInjection: true,
  legacy: false,
});

export default VueI18n;
