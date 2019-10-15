import React from "react";
import { Subscribe } from "unstated";

import MainStore from "../../stores/MainStore";

import UserMenu from "./UserMenu";
import Navigation from "./Navigation";
import NavToggle from "./NavToggle";
import NavLinks from "./NavLinks";
import NavUnauthenticated from "./NavUnauthenticated";
import AppBranding from "./AppBranding";
import SubMenu from "../SubMenu";
import StatusMessage from "../StatusMessage";

import styles from "./Header.module.scss";

const Header = () => (
  <div className={styles.headerContainer}>
    <Subscribe to={[MainStore]}>
      {({
        auth: { logout },
        state: {
          auth: { isAuthenticated, user }
        }
      }) => (
        <div className={styles.topBar}>
          <AppBranding />
          <Navigation />
          {isAuthenticated && user ? (
            <UserMenu logout={logout} user={user} />
          ) : (
            <nav className={styles.nav}>
              <ul className={styles.menu} aria-label="Main menu">
                <NavLinks />
                <NavUnauthenticated />
              </ul>
            </nav>
          )}
          <NavToggle />
        </div>
      )}
    </Subscribe>
    <SubMenu />
    <StatusMessage />
  </div>
);

export default Header;
