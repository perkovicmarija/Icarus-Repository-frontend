import { Provider } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { red, brown, grey } from "@mui/material/colors";
import { IntlProvider } from "react-intl";
import PublicRoutes from "./publicRouter";
import Boot from "./redux/boot";
import { store, history } from "./redux/store";
import { AppLocale } from "./helpers/LanguageProvider";
import { getDefaultLanguage } from "./helpers/LanguageProvider/config";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DndProvider } from "react-dnd";
import { getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const currentAppLocale = AppLocale[getDefaultLanguage().locale];

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/en-gb";
dayjs.extend(utc);
/* import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone); */

const theme = createTheme({
  palette: {
    primary: {
      light: grey[300],
      main: grey[800],
      dark: grey[900],
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: brown[400],
      main: brown[600],
      dark: brown[800],
      contrastText: "#FFFFFF",
    },
    error: red,
  },
});

function App() {
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              // dateLibInstance={moment}
              adapterLocale="en-gb"
            >
              <Provider store={store}>
                <PublicRoutes history={history} />
              </Provider>
            </LocalizationProvider>
          </StyledEngineProvider>
        </ThemeProvider>
      </DndProvider>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </IntlProvider>
  );
}

Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
