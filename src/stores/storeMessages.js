// TODO: add selfdestruct key
const storeMessages = {
  getUserState: {
    loading: 'Checking Authorization',
    success: 'Authorized.',
  },
  login: {
    loading: 'Logging in',
    success: 'Successfully Logged In.',
  },
  logout: {
    loading: 'Logging out',
    success: 'Successfully logged out.',
  },
  reauthLogin: {
    loading: 'Reauthenticating',
    success: 'Successfully Reauthenticated.',
  },
  access: {
    loading: 'Checking access code',
    success: 'Access granted.',
  },
};

export const makeActive = methodName => {
  Object.keys(storeMessages).map(k => (storeMessages[k].active = k === methodName));
  return storeMessages[methodName];
};

export const getStoreMessage = methodName => storeMessages[methodName];
