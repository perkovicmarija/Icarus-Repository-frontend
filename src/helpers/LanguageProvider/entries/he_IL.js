import appLocaleData from '@formatjs/intl-pluralrules/dist/locale-data/is';
import enMessages from '../locales/he_IL.json';
// import { getKeys, getValues } from '../conversion';
// getValues(enMessages);

const HeLang = {
  messages: {
    ...enMessages,
  },
  locale: 'he-IL',
  data: appLocaleData,
};
export default HeLang;
