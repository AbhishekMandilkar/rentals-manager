import { useState } from "react";

function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  return [isToggled, toggle];
}

export default useToggle;
