import { useToggle } from "../hooks/useToggle";
import { renderHook, act, waitFor } from "@testing-library/react";

// wrong test
// test("hooks test sample", async () => {
//   const [state, change] = useToggle();

//   expect(state).toBeFalsy();

//   change();

//   await waitFor(() => {
//     expect(state).toBeTruthy();
//   });
// });

test("hooks test sample2", async () => {
  const { result } = renderHook(() => useToggle());
  console.log(JSON.stringify(result));

  // init state should be false
  expect(result.current.state).toBeFalsy();

  // switch state by change from useToggle
  act(() => {
    result.current.change();
  });
  expect(result.current.state).toBeTruthy();
});
