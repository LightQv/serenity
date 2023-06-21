import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) navigate("/");
  }, [user.id]);

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
