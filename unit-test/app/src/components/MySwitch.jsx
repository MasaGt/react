import { useToggle } from "../hooks/useToggle";

export const MyCacl = () => {
  const [state, change] = useToggle();

  return (
    <>
      {state && <p>You can see me</p>}
      <button onClick={change}>toggle</button>
    </>
  );
};
