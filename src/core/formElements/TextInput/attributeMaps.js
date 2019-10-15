const inputMap = {
  username: {
    autoComplete: 'username',
    type: 'text',
  },
  password: {
    autoComplete: 'current-password',
    type: 'password',
  },
  email: {
    autoComplete: 'email',
    type: 'email',
  },
  name: {
    autoComplete: 'name',
    type: 'name',
  },
  phone: {
    autoComplete: 'tel',
    type: 'tel',
  },
  address: {
    autoComplete: 'street-address',
    type: 'street-address',
  },
  city: {
    autoComplete: 'address-level2',
    type: 'address-level2',
  },
  state: {
    autoComplete: 'address-level1',
    type: 'address-level1',
  },
  zip: {
    autoComplete: 'postal-code',
    type: 'postal-code',
  },
  date: {
    autoComplete: 'bday',
    type: 'date',
  },
  'datetime-local': {
    type: 'datetime-local',
  },
  time: {
    type: 'time',
  },
  week: {
    type: 'week',
  },
  month: {
    autoComplete: 'bday-month',
    type: 'month',
  },
  url: {
    autoComplete: 'url',
    type: 'url',
  },
  color: {
    type: 'color',
  },
  gender: {
    autoComplete: 'gender',
    type: 'text',
  },
};

export const formInputMap = type => {
  const formatType = inputMap[type];
  const name = type.replace(/\b\w/g, l => l.toUpperCase()) || '';
  if (!formatType) {
    return { type, name };
  }
  return { ...inputMap[type], name };
};
