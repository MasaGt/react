/**
 * sample for snapshot test
 */

import { MyForm } from "../components/MyForm";
import { render } from "@testing-library/react";

test("snapshot sample", () => {
  const { container } = render(<MyForm />);
  expect(container).toMatchSnapshot();
});

// test("inline snapshot sample", () => {
//   render(<MyForm />);
//   // expect(container).toMatchInlineSnapshot();
//   const form = screen.getByRole("textbox");
//   expect(form).toMatchInlineSnapshot();
// });
test("inline snapshot sample", () => {
  const { container } = render(<MyForm />);

  expect(container).toMatchInlineSnapshot(`
<div>
  <form>
    <input
      id="name"
      type="text"
      value=""
    />
    <button
      type="submit"
    >
      submit
    </button>
  </form>
</div>
`);
});
