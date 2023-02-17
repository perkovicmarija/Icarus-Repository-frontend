import appLocaleData from '@formatjs/intl-pluralrules/dist/locale-data/hr';
import enMessages from '../locales/hr_HR.json';
// import { getKeys, getValues } from '../conversion';
// getValues(enMessages);

const HrLang = {
  messages: {
    ...enMessages,
  },
  locale: 'hr-HR',
  data: appLocaleData,
};
export default HrLang;
