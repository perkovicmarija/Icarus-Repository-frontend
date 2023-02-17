import React from 'react';

import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, StyledEngineProvider  } from '@mui/material/styles';
import { red, brown, blueGrey } from '@mui/material/colors';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { IntlProvider } from 'react-intl';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import 'moment/locale/en-gb';

import PublicRoutes from './publicRouter';
import Boot from './redux/boot';
import { store, history } from './redux/store';
import AppLocale from './helpers/LanguageProvider/index';
import { getDefaultLanguage } from './helpers/LanguageProvider/config';

const currentAppLocale =
    AppLocale[getDefaultLanguage().locale];

const theme = createTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: blueGrey[400],
            main: blueGrey[600],
            dark: blueGrey[800],
            contrastText: '#FFFFFF',
        },
        secondary: {
            light: brown[400],
            main: brown[600],
            dark: brown[800],
            contrastText: '#FFFFFF'
        },
        error: red
    }
});

function App() {
    moment.tz.setDefault("UTC");

    return(
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
        >
            <ThemeProvider theme={theme}>
                <StyledEngineProvider injectFirst>
                    <LocalizationProvider dateAdapter={MomentUtils} dateLibInstance={moment} locale="en-gb">
                        <Provider store={store}>
                            <PublicRoutes history={history}/>
                        </Provider>
                    </LocalizationProvider>
                </StyledEngineProvider>
            </ThemeProvider>
        </IntlProvider>
    )
};

Boot()
    .then(() => App())
    .catch(error => console.error(error));

export default App;
export { AppLocale };