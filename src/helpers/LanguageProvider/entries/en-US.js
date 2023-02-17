import appLocaleData from '@formatjs/intl-pluralrules/dist/locale-data/en';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
  },
  locale: 'en-US',
  data: appLocaleData,
};
export default EnLang;
