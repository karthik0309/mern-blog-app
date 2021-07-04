import { createContext, useReducer, useContext, useEffect } from "react";
import Reducer from "./Reducer";

const InitialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const GlobalState = createContext(InitialState);

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <GlobalState.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};
export default StateProvider;
export const useGlobalStateValue = () => useContext(GlobalState);
