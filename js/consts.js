export default {
  baseUrl: `https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/`,
  getCurrentUser: () => {
    let loginUserId = localStorage.getItem("loginUserId");
    return loginUserId === null ? null : loginUserId;
  },
};
