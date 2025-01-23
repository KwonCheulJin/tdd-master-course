import { ChangeEventHandler, useState } from 'react';

export default function useSelect<T extends Record<string, T[keyof T]>>({
  init,
  options,
  base,
}: {
  init: T[keyof T];
  options: T;
  base: T[keyof T];
}) {
  const [select, setSelect] = useState(init);

  const onChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const cur = e.target.value;

    let found: T[keyof T] | undefined = undefined;
    for (const value of Object.values(options)) {
      if (cur === value) found = value;
    }

    const next = found ?? base;
    setSelect(next);
  };
  return {
    select,
    onChange,
  };
}
