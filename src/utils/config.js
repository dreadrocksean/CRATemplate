export const SUBDIRECTORY = `/${process.env.REACT_APP_HOST}`;

const delay = (t, v) =>
  new Promise(function(resolve) {
    setTimeout(resolve.bind(null, v), t);
  });

export const FakeAPI = {
  fake: true, //default false
  getState: async data => {
    if (!data.accessCode) {
      return delay(1000).then(() =>
        Promise.resolve({
          isAuthenticated: false,
          isReauthRequired: false,
          user: {}
        })
      );
    }
    try {
      const res = await fetch("/api/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        throw Error("Network Request Failed");
      }
      const user = await res.json();
      console.log("success!: ", user);
      return Promise.resolve({
        isAuthenticated: true,
        isReauthRequired: false,
        user
      });
    } catch (error) {
      console.log("core error", error);
      return Promise.reject(error);
    }
  }
};
