import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const userInfos = useMemo(() => {
    return { user, setUser, token, setToken };
  }, [user]);

  return (
    <UserContext.Provider value={userInfos}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
