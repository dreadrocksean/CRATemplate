import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";

import OverlayMenu from "../containers/OverlayMenu";
import Header from "../containers/Header";
import PageContent from "../containers/PageContent";
import Footer from "../containers/Footer";

import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";

import styles from "./styles/App.module.scss";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById("jss-insertion-point")
});

// Additional Colors
const theme = createMuiTheme({
  palette: {
    primary: { main: "#246BA1" },
    secondary: { main: "#7EC03D" },
    error: { main: "#ac3931" }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
    htmlFontSize: 16
  }
});

const App = () => (
  <div className={styles.app}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <OverlayMenu />
        <Router>
          <Header />
          <PageContent />
          <Footer />
        </Router>
      </MuiThemeProvider>
    </JssProvider>
  </div>
);

export default App;
