import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
}

export default function ContentDetailAuthorAside({ className }: Props) {
  return (
    <aside className={clsx('mt-8 ', layoutStyles.px, className)}>
      <Image
        width={64}
        height={64}
        alt="charles"
        src="/globe.svg"
        className="mb-4"
      />
      <Link href="/user/id">{'charles'}</Link>
    </aside>
  );
}
