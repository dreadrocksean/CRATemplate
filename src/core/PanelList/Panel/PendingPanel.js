import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanelSummary, Typography, RootRef } from '@material-ui/core';
import classNames from 'classnames';
import { Button, Icon } from '@material-ui/core';
// import { Transition, config, animated, AnimatedValue, controller as spring } from 'react-spring';
import { animated } from 'react-spring';

import LoadingAnimation from '../../../containers/StatusMessage/LoadingAnimation';
// import { animationStyles } from '../../../data';

import styles from './pendingPanel.module.scss';

// const localAnimStyles = { ...animationStyles };
// const AnimRootRef = animated(RootRef);

const PendingPanel = () => {
  const [show] = useState(true);
  // const element = useRef(null);
  // heightAnim = new AnimatedValue(0); // Reasonable non zero integer

  // const transitions = useTransition(index, p => p, {
  //   from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  //   enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  // })

  useEffect(() => {
    if (!this.element.current) {
      return;
    }
    // const height = this.element.current.getBoundingClientRect().height;
    // spring(this.heightAnim, { to: height }).start();
  });

  // const localRetry = () => {
  //   setTimeout(() => {
  //     this.props.retry(this.props.text);
  //   }, 101);
  //   this.props.remove(this.props.text)();
  // };

  console.log('pendingPanel render');
  const { errorMessage = null, text, pending = true, remove, toBeRemoved = false } = this.props;

  const message = errorMessage || (pending ? 'Loading' : 'NO RESPONSE!');

  const pendingStyle = [styles.pending];
  if (!pending) {
    pendingStyle.push(styles.error);
  }
  const style = pendingStyle.join(' ');

  return (
    show &&
    !toBeRemoved && (
      <animated.div
        style={{
          height: this.heightAnim.interpolate(h => h),
        }}
        className={style}
      >
        <RootRef rootRef={this.element}>
          <ExpansionPanelSummary
            classes={{
              content: styles.content,
            }}
          >
            <Typography className={classNames(styles.hColumn, styles.heading)}>{text}</Typography>
            <Typography className={classNames(styles.hColumn, styles.heading)}>
              {message}
              {pending && <LoadingAnimation />}
            </Typography>
            {!pending && (
              <div className={classNames(styles.hColumn, styles.retry)}>
                <Button
                  className={styles.button}
                  mini
                  size="small"
                  variant="contained"
                  component="span"
                  onClick={this.localRetry}
                >
                  Retry
                </Button>
                <Icon className={styles.close} onClick={remove(text)}>
                  close
                </Icon>
              </div>
            )}
          </ExpansionPanelSummary>
        </RootRef>
      </animated.div>
    )
  );
};

PendingPanel.propTypes = {
  text: PropTypes.string,
  errorMessage: PropTypes.string,
  pending: PropTypes.bool,
  retry: PropTypes.func,
  remove: PropTypes.func,
  toBeRemoved: PropTypes.bool,
};

export default PendingPanel;
