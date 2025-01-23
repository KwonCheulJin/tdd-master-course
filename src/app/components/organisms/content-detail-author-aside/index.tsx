import { User } from '@/domains/user/entity';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  author: User;
}

export default function ContentDetailAuthorAside({ className, author }: Props) {
  return (
    <aside
      className={clsx('mt-8 ', layoutStyles.px, className)}
      data-testid="author-aside"
    >
      <Image
        width={64}
        height={64}
        alt={author.nickname}
        src={author.imgUrl}
        className="mb-4"
      />
      <Link href={`/user/${author.id}`}>{author.nickname}</Link>
    </aside>
  );
}
