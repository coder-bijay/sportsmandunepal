import Cookies from "js-cookie";

export const isAuthenticated = () => {
  const token = Cookies.get("user_token");
  const name = Cookies.get("user_name");
  return {
    authenticated: Boolean(token && token.trim() !== ""),
    user: name,
  };
};
