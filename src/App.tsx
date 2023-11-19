import { Provider } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { amber } from "@mui/material/colors";
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

const currentAppLocale =
  AppLocale[getDefaultLanguage().locale as keyof typeof AppLocale];

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/en-gb";
dayjs.extend(utc);
/* import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone); */

const theme = createTheme({
  palette: {
    primary: {
      light: "#021b43",
      main: "#021b43",
      dark: "#001432",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: amber[400],
      main: amber[600],
      dark: amber[800],
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#811818",
    },
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick={false}
        draggable={false}
        style={{ width: "600px", maxWidth: "100%", whiteSpace: "pre-wrap" }}
      />
    </IntlProvider>
  );
}

Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
