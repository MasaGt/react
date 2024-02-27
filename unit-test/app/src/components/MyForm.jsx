/**
 * フォームコンポーネント
 */

import { useState } from "react";

export const MyForm = () => {
  const [name, setName] = useState("");

  const onChange = (e) => {
    setName(e.target.value);
  };
  const isNameValid = name.length > 0;

  return (
    <>
      <form>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button type="submit" disabled={isNameValid}>
          submit
        </button>
      </form>
    </>
  );
};
