import { ContentView } from '@/domains/content/type';
import { localizeDate } from '@/libs/sub-string';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  content: ContentView;
}

export default function ContentItem({ className, content }: Props) {
  return (
    <div className={clsx(className)} data-testid="content-item">
      <Link href={`/contents/${content.id}`} className="flex justify-center">
        <Image width={600} height={600} src="file.svg" alt="title" />
      </Link>
      <h2 className="text-2xl font-bold mt-4">
        <Link href={`/contents/${content.id}`}>{content.title}</Link>
      </h2>
      <div className="text-neutral-300">
        <Link href={`/contents/${content.id}`}>{content.body}</Link>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/contents/${content.id}`}>
            <Image
              width={32}
              height={32}
              src={content.author.imgUrl}
              alt={content.author.nickname}
              className="mr-2"
            />
          </Link>
          <span>{content.author.nickname}</span>
        </div>
        <div>{localizeDate(content.createdAt)}</div>
      </div>
    </div>
  );
}
