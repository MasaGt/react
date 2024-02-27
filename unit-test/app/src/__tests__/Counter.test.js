import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../components/Counter";

let user = null;

beforeEach(() => {
  // eslint-disable-next-line no-undef
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  user = userEvent.setup();
});
test("increment test", async () => {
  // incrementボタンを取得し、クリックイベントを発火させる
  // コンポーネントのレンダリング
  let CounterComponent;
  render(<Counter />, CounterComponent);
  // act(() => {
  //   // Incrementというテキストを持つ要素を取得する
  //   const incrementBtn = screen.getByText("Increment");
  //   // clickイベント発火
  //   userEvent.click(incrementBtn);
  // });

  // Incrementというテキストを持つ要素を取得する
  const incrementBtn = screen.getByText("Increment");

  // clickイベント発火
  await user.click(incrementBtn);
  // カウンターの値を確認する
  const count = screen.getByText("Count: 1");
  expect(count).toBeInTheDocument();
});

test("decriment test", async () => {
  let CounterComponent;
  render(<Counter />, CounterComponent);

  // act(() => {
  //   const decrementBtn = screen.getByText("Decrement");
  //   userEvent.click(decrementBtn);
  // });

  const decrementBtn = screen.getByText("Decrement");
  await user.click(decrementBtn);
  const result2 = screen.getByText("Count: -1");
  expect(result2).toBeInTheDocument();
  // expect(await screen.findByText("Count: 0")).toBeNull();
});
