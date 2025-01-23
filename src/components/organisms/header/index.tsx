import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {
  HiChevronDown,
  HiOutlineBell,
  HiOutlineUser,
  HiSearch,
} from 'react-icons/hi';

interface Props {
  className?: string;
  user?: {
    nickname: string;
  };
}

export default function Header({ className, user }: Props) {
  return (
    <div
      className={clsx('flex justify-between h-14', layoutStyles.px, className)}
      data-testid={'header'}
    >
      <div className="flex items-center">
        <Link href="/" aria-label="home">
          <Image
            width={16}
            height={16}
            src="/vercel.svg"
            alt="home"
            className="mr-4"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          href="notification"
          className="p-3 block"
          aria-label="notification"
        >
          <HiOutlineBell className="text-2xl" />
        </Link>
        <Link href="search" className="p-3 block" aria-label="search">
          <HiSearch className="text-2xl" />
        </Link>
        <Link
          href="/contents/post"
          className="border-green-400 rounded-full border-2 px-3 py-1 text-green-400 text-sm mr-3"
        >
          새 글 작성
        </Link>
        {user !== undefined ? (
          <button className="flex items-center" aria-label="user-menu">
            <HiOutlineUser className="text-2xl" />
            <HiChevronDown />
          </button>
        ) : (
          <Link
            href="/users/sign-in"
            className="px-4 py-2 font-medium bg-neutral-800 rounded-full"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}
