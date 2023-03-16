import { useState } from "react";

export const useToogle = () => {
  const [show, setShow] = useState(false);

  const toogleShow = () => {
    setShow((actual) => !actual);
  };

  return {
    show,
    toogleShow,
  };
};
