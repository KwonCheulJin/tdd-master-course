'use client';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  isAuthorized: boolean;
}

export default function ContentDetailCommentSection({
  className,
  isAuthorized,
}: Props) {
  const router = useRouter();
  const onClickTextarea = () => {
    if (!isAuthorized) {
      router.push('/users/sign-in');
      return;
    }
  };
  return (
    <section
      className={clsx('mt-8 mb-12', layoutStyles.mx, className)}
      data-testid="comment-section"
    >
      <form>
        <textarea
          name="comment"
          id="comment"
          className="w-full bg-neutral-800 rounded px-4 py-4 resize-none focus:outline-none"
          onClick={onClickTextarea}
        />
        <div className="flex justify-end mt-2">
          <button className="bg-green-300 text-black rounded px-4 py-2">
            댓글 작성
          </button>
        </div>
      </form>
    </section>
  );
}
