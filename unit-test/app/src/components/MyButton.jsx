import { useState } from "react";

export const MyButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked(() => {
      return !isClicked;
    });
  };

  return (
    <>
      {isClicked && <p>Button Clicked</p>}
      <button onClick={onClick}>show text</button>
    </>
  );
};
