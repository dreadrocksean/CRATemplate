import React from 'react';
import { Subscribe } from 'unstated';

import MainStore from '../../stores/MainStore';
// import AuthStore from '../../stores/AuthStore';
import LoaderBar from '../../core/LoaderBar';

let checked = false;

const Auth = () => {
  return (
    <Subscribe to={[MainStore]}>
      {main => {
        if (!checked) {
          checked = true;
          main.auth.getUserState();
        }
        return <LoaderBar />;
      }}
    </Subscribe>
  );
};

export default Auth;
