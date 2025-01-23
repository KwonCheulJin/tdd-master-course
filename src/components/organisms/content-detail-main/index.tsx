import { ContentView } from '@/domains/content/type';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { MIDDLE_DOT } from '@/utils/string';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
  content: ContentView;
}

export default function ContentDetailMain({ className, content }: Props) {
  return (
    <main className={clsx('mt-8', layoutStyles.px, className)}>
      <header>
        <h1 className="text-4xl font-bold leading-normal">{content.title}</h1>
        <div>
          <span>{content.author.nickname}</span>
          <span>
            {` `} {MIDDLE_DOT} {` `}
          </span>
          <span>{localizeDate(content.createdAt)}</span>
        </div>
        {true && (
          <div className="flex justify-end">
            <Link href={`/content/${'id'}/edit`} className="mr-4">
              수정
            </Link>
            <button>삭제</button>
          </div>
        )}
      </header>
      <div>{content.body}</div>
    </main>
  );
}
