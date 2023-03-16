import { AppContext } from "@config/app.context";
import { useContext } from "react";

export const useAppContext = () => {
  return useContext(AppContext);
};
