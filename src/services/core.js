const protocol = 'https';
const host = process.env.REACT_APP_HOST;
const endpoint = process.env.REACT_APP_ENDPOINT;
const isDev = process.env.NODE_ENV === 'development';

if (!host || !endpoint) throw new Error('configuration missing.');

const baseURL = `${protocol}://${host}/${endpoint}`;

const getRequestTimestamp = () => new Date().getTime();

const parse = data => {
  delete data.xId;
  delete data.resultCode;
  return data;
};

export const Get = ({ rm }) =>
  fetch(`${baseURL}?rm=${rm}&ts=${getRequestTimestamp()}`, {
    method: 'GET',
    credentials: 'include',
  });

export const NodePost = async (rm, data = {}) => {
  try {
    const res = await fetch('/api/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('res: ', res);
    const json = await res.json();
    return Promise.resolve({ user: parse(json) });
  } catch (error) {
    console.log('core error', error);
    return Promise.reject(error);
  }
};

export const Post = async (rm, data = {}) => {
  if (isDev) {
    console.log('rm', rm);
    console.log('data', data);
  }
  const formData = new FormData();
  formData.append('rm', rm);
  formData.append('xhr', true);
  formData.append('ts', getRequestTimestamp());
  formData.append('i', JSON.stringify(data));

  try {
    const res = await fetch(baseURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    if (!res.ok) {
      throw Error('Network Request Failed');
    }
    const json = await res.json();
    return Promise.resolve(parse(json));
  } catch (error) {
    console.log('core error', error);
    return Promise.reject(error);
  }
};
