import { Post, NodePost } from './core';
import { FakeAPI as API } from '../utils/config';

export const Login = (username, password) => Promise.resolve({ ok: true, username, password });
export const ReauthLogin = password => Post('auth/reauth', { password });
export const Logout = () => Post('auth/logout');
export const GetState = () => (API.fake ? API.getState({ accessCode: '' }) : Post('auth/getState'));
export const Access = code => NodePost('/api/find', { accessCode: code });
