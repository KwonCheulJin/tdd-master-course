import ContentDetailActionButtons from '@/components/molecules/content-detail-action-btns';
import { ContentView } from '@/domains/content/type';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { MIDDLE_DOT } from '@/utils/string';
import clsx from 'clsx';

interface Props {
  className?: string;
  content: ContentView;
  isAuthor: boolean;
}

export default function ContentDetailMain({
  className,
  content,
  isAuthor,
}: Props) {
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
        {isAuthor && <ContentDetailActionButtons contentId={content.id} />}
      </header>
      <div>{content.body}</div>
    </main>
  );
}
