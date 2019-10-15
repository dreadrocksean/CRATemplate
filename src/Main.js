import React, { useContext } from "react";
import { Route, Switch, Redirect, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import "./App.css";

function Main() {
  console.log("__RouterContext: ", __RouterContext);
  const { location } = useContext(__RouterContext);
  console.log("location: ", location);
  const transitions = useTransition(location, location => location.pathname, {
    // initial: { transform: "translate3d(0, 0%,0)" },
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" }
  });
  return transitions.map(({ item, props, key }) => (
    <animated.div
      style={{ ...props, position: "absolute", height: "100%", width: "100%" }}
      key={key}
    >
      <div className="Main">
        <Switch>
          <Route exact path="/" component={Page1} />
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
          <Route path="/page3" component={Page3} />
          <Redirect to="/page1" />
        </Switch>
      </div>
    </animated.div>
  ));
}

export default Main;
