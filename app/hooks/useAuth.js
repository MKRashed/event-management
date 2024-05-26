import { useContext } from "react";
import { AuthContext } from "../actions/contexts";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
};
