import React from "react";
import styles from "./Header.module.scss";
import Logo from "../../assets/images/SDlogo.png";

const appName = process.env.REACT_APP_APPNAME;
const appHost = `/${process.env.REACT_APP_HOST}`;

const AppBranding = () => (
  <a className={styles.branding} href={appHost}>
    <img src={Logo} alt="Logo" />
    {/*<span className={styles.applicationName}>{appName}</span>*/}
  </a>
);

export default AppBranding;
