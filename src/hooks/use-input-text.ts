import { ChangeEventHandler, useState } from 'react';

export default function useInputText(init: string) {
  const [text, setText] = useState(init);

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setText(e.target.value);
  };
  return {
    text,
    onChange,
  };
}
