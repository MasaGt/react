import { useState } from "react";

export const useToggle = () => {
  const [state, setState] = useState(false);

  const change = () => {
    setState((prev) => !prev);
  };

  return { state, change };
};
