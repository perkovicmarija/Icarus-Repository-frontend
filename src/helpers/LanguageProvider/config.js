import englishLang from '../../assets/img/flag/united_kingdom.svg';
import croatiaLang from '../../assets/img/flag/croatia.svg';

const config = {
    defaultLanguage: "english",
    options: [
        {
            languageId: 'english',
            locale: 'en',
            text: 'English',
            intlId: 'language.english',
            icon: englishLang,
            direction: 'ltr'
        },
        {
            languageId: 'croatian',
            locale: 'hr',
            text: 'Croatian',
            intlId: 'language.croatian',
            icon: croatiaLang,
            direction: 'ltr'
        },
    ],
};

export function getCurrentLanguage(lang) {
    let selectedLanguage = config.options[0];
    config.options.forEach(language => {
        if (language.languageId === lang) {
            selectedLanguage = language;
        }
    });
    return selectedLanguage;
}

export function getDefaultLanguage() {
    const languageCode = localStorage.getItem('languageCode');
    let lang = null;
    if(languageCode !== null){
        config.options.forEach(language => {
            if (language.locale === languageCode) {
                lang = language;

            }
        });
    }
    if (lang === null){
        let langEn = config.options[0];
        config.options.forEach(language => {
            if (language.languageId === langEn.languageId) {
                lang = language;
            }
        });
    }
    return lang;
}

export default config;
