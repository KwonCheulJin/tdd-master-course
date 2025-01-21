import Link from 'next/link';

interface LinkItem {
  tag: string;
  href: string;
}

const links: Array<LinkItem> = [
  {
    tag: '컨텐츠 상세페이지',
    href: '/contents/1cd620e6-58df-4856-b196-02f3e0b7b89f',
  },
];

export default function DevNav() {
  return (
    <ul className={'fixed right-10 bottom-10'}>
      {links.map(link => (
        <li key={link.tag}>
          <Link href={link.href}>{link.tag}</Link>
        </li>
      ))}
    </ul>
  );
}
