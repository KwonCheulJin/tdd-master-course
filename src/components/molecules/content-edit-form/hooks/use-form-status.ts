import {
  validateBody,
  validateTitle,
} from '@/domains/content/content-validation';
import { ContentView } from '@/domains/content/type';
import { isEqual, pick } from 'radashi';
import { useEffect, useState } from 'react';

export default function useFormStatus({
  title,
  body,
  thumbnailUrl,
  content,
}: {
  title: string;
  body: string;
  thumbnailUrl: string | undefined;
  content: ContentView;
}) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const titleOk = validateTitle(title);
    const bodyOk = validateBody(body);
    const thumbnailOk = typeof thumbnailUrl === 'string';
    const isChanged = isEqual(
      { title, body, thumbnail: thumbnailUrl },
      pick(content, ['title', 'body', 'thumbnail'])
    );
    console.log('🚀 ~ useEffect ~ isChanged:', isChanged);
    const next = [titleOk, bodyOk, thumbnailOk, !isChanged].every(
      c => c === true
    );
    setStatus(next);
  }, [title, body, thumbnailUrl]);

  return status;
}
