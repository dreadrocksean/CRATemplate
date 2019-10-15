import {
  Login,
  Logout,
  ReauthLogin,
  GetState,
  Access
} from "../services/authService";
import Store from "./Store";

export class AuthStore extends Store {
  name = "auth";
  initState = {
    loading: null,
    error: null,
    isAuthenticated: undefined, //Required for loading animation
    isReauthRequired: false,
    user: null
  };

  getUserState = () => {
    this.setStoreMessage("getUserState");
    this.service(GetState, undefined, true);
  };

  login = async ({ username, password }) => {
    this.setStoreMessage("login");
    await this.service(Login, [username, password]);
    this.getUserState();
  };

  access = async code => {
    this.setStoreMessage("access");
    try {
      const res = await this.service(Access, [code]);
      const json = await res.json();
      return Promise.resolve(json);
    } catch (err) {
      return Promise.resolve({ error: err });
    }
    // this.getUserState();
  };

  reauthLogin = async ({ password }) => {
    this.setStoreMessage("reauthLogin");
    await this.service(ReauthLogin, [password]);
    this.getUserState();
  };

  logout = async () => {
    this.setStoreMessage("logout");
    await this.service(Logout);
    this.getUserState();
  };

  updateReauth = reauth => {
    this.setState({ reauth });
  };
}

export default new AuthStore();
