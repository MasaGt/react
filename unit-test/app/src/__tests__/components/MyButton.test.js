import { MyButton } from "../../components/MyButton";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("findBy sample", async () => {
  // findByで 1000ms 待ってから画面の要素を検索するサンプル
  render(<MyButton />);

  // テキストが表示されていないことを確認
  expect(screen.queryByText("Button Cliked")).toBeNull();

  // ボタン押下
  const button = screen.getByRole("button");
  userEvent.click(button);
  const result = await screen.findByText("Button Clicked");
  // テキストが表示されていることを確認
  expect(result).toBeInTheDocument();
});

test("getBy and userEvent sample", async () => {
  // awaitでuserEventでの画面更新を待つサンプル
  render(<MyButton />);

  const button = screen.getByRole("button");
  await userEvent.click(button);

  expect(screen.getByText("Button Clicked")).toBeInTheDocument();
});

test("waitFor sample", async () => {
  render(<MyButton />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText("Button Clicked")).toBeInTheDocument();
  });
});

test("fireEvent sample", () => {
  render(<MyButton />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(screen.getByText("Button Clicked")).toBeInTheDocument();
});
