'use client';
import { deleteContentAction } from '@/components/molecules/content-detail-action-btns/server-side';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  contentId: string;
}

export default function ContentDetailActionButtons({
  className,
  contentId,
}: Props) {
  const router = useRouter();

  const onClickDeleteButton = async () => {
    const response = deleteContentAction(contentId);
    if (response === undefined) return;

    router.push('/contents');
  };
  return (
    <div className={clsx('flex items-center', className)}>
      <Link href={`/content/${contentId}/edit`} className="mr-4">
        수정
      </Link>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
}
