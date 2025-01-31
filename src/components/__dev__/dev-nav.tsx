'use client';
import { resetVirtualFixtureAction } from '@/components/__dev__/server-side';
import { contentFixtures } from '__tests__/fixture/contents';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface LinkItem {
  tag: string;
  href: string;
}

const links: Array<LinkItem> = [
  {
    tag: '컨텐츠 상세페이지',
    href: `/contents/${contentFixtures[0].id}`,
  },
  {
    tag: '컨텐츠 상세페이지 void',
    href: '/contents/1cd620e6-58df-4856-b196-02f3e0b7b89f',
  },
  {
    tag: '컨텐츠 리스트 페이지',
    href: '/contents',
  },
  {
    tag: '컨텐츠 생성 페이지',
    href: '/contents/post',
  },
  {
    tag: '컨텐츠 수정 페이지',
    href: `/contents/${contentFixtures[0].id}/edit`,
  },
  {
    tag: '컨텐츠 수정 페이지 void',
    href: '/contents/1cd620e6-58df-4856-b196-02f3e0b7b89f/edit',
  },
];

export default function DevNav() {
  const onClick = async () => {
    await resetVirtualFixtureAction();
    toast('reset fixture success', { autoClose: 2000 });
  };
  return (
    <ul className={'fixed right-10 bottom-10'}>
      {links.map(link => (
        <li key={link.tag}>
          <Link href={link.href}>{link.tag}</Link>
        </li>
      ))}
      <button onClick={onClick}>reset</button>
    </ul>
  );
}
