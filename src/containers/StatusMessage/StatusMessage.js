import React, { useState } from "react";
import PropTypes from "prop-types";
import { Subscribe } from "unstated";

import Icon from "@material-ui/core/Icon";
import { useSpring, animated } from "react-spring";

import MainStore from "../../stores/MainStore";
import LoadingAnimation from "./LoadingAnimation";
// import { animationStyles } from '../../data';

import styles from "./statusMessage.module.scss";

const StatusMessage = props => {
  const [show] = useState(false);
  const springProps = useSpring({ opacity: show ? 1 : 0 });

  const closeable =
    typeof props.closeable === "undefined" ? true : props.closeable;
  const alone = props.alone ? styles.alone : "";

  const renderElement = (message, deleteMessage /*, addendums*/) => (
    <animated.div style={springProps}>
      {message.message && (
        <div
          style={{ ...props }}
          className={`${styles.statusMessage} ${alone}`}
        >
          <div className={`${styles.icon} ${styles[message.level.string]}`}>
            <Icon>{message.level.icon}</Icon>
          </div>
          <div className={styles.message}>
            <p style={{ display: "flex", alignItems: "center" }}>
              {message.message}
            </p>
            {message.level.value === 1 && <LoadingAnimation />}
          </div>
          {/*<div className={styles.messageAddendum}>{addendums}</div>*/}
          {closeable && (
            <div className={styles.close} onClick={deleteMessage}>
              <Icon>close</Icon>
            </div>
          )}
        </div>
      )}
    </animated.div>
  );

  return (
    <Subscribe to={[MainStore]}>
      {({ message: { deleteMessage }, state: { message } }) => {
        console.log("message: ", message);
        return renderElement(
          message,
          deleteMessage,
          props,
          StatusMessage.getAddendums(message)
        );
      }}
    </Subscribe>
  );
};

StatusMessage.getAddendums = message => {
  let msgs = [];
  message.addendum = "Hey there can you see me?!";
  if (message.addendum) {
    if (typeof message.addendum !== "object") {
      message.addendum = [message.addendum];
    }
    message.addendum.forEach((msg, key) => {
      msgs.push(<div key={key}>{msg}</div>);
    });
  }
  return msgs;
};

StatusMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

StatusMessage.propTypes = {
  closeable: PropTypes.bool,
  alone: PropTypes.bool
};

export default StatusMessage;
