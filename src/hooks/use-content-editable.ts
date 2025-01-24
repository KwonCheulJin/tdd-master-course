import { FormEventHandler, useState } from 'react';

export default function useContentEditable(init: string) {
  const [text, setText] = useState(init);

  const onInput: FormEventHandler<HTMLDivElement> = e => {
    const cur = e.currentTarget.innerText;
    setText(cur);
  };
  return {
    text,
    onInput,
  };
}
