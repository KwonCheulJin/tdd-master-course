import { uploadImg } from '@/effects/image/image.effect';
import { ChangeEventHandler, useState } from 'react';

export default function useInputImage(init: string) {
  const [src, setSrc] = useState(init);
  const [url, setUrl] = useState<string | undefined>(undefined);

  const onChange: ChangeEventHandler<HTMLInputElement> = async e => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const url = await uploadImg(file);

    setSrc(url);
    setUrl(url);
  };
  return {
    src,
    url,
    onChange,
  };
}
