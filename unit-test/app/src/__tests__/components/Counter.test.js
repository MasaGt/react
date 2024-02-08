import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Counter } from "../../components/Counter";

test("increment test", () => {
  // incrementボタンを取得し、クリックイベントを発火させる
  // コンポーネントのレンダリング
  let CounterComponent;
  render(<Counter />, CounterComponent);
  act(() => {
    // Incrementというテキストを持つ要素を取得する
    const incrementBtn = screen.getByText("Increment");
    // clickイベント発火
    userEvent.click(incrementBtn);
  });

  // カウンターの値を確認する
  const count = screen.getByText("Count: 1");
  expect(count).toBeInTheDocument();
});

test("decriment test", () => {
  let CounterComponent;
  render(<Counter />, CounterComponent);
  act(() => {
    const decrementBtn = screen.getByText("Decrement");
    userEvent.click(decrementBtn);
  });

  const count = screen.getByText("Count: -1");
  expect(count).toBeInTheDocument();
});
