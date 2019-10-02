import React from "react";
import { render } from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./store/reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { blue, purple, blueGrey } from "@material-ui/core/colors";

import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const textPrimary = blueGrey[500];
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple
  },
  typography: {
    h2: {
      color: textPrimary
    },
    body1: {
      color: textPrimary
    }
  }
});

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
