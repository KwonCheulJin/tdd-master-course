import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export default function ContentDetailCommentSection({ className }: Props) {
  return (
    <section className={clsx('mt-8 mb-12', layoutStyles.mx, className)}>
      <form>
        <textarea
          name="comment"
          id="comment"
          className="w-full bg-neutral-800 rounded px-4 py-4 resize-none focus:outline-none"
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
