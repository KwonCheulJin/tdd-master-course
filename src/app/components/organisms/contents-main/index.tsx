import ContentItem from '@/app/components/molecules/content-item';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import { list } from 'radashi';
import { HiSearch } from 'react-icons/hi';

interface Props {
  className?: string;
}

export default function ContentsMain({ className }: Props) {
  return (
    <div className={clsx('mb-12', layoutStyles.mx, className)}>
      <div className="flex items-center justify-center">
        <select
          name="sort"
          id="sort"
          className="bg-neutral-800 px-2 py-1 rounded focus:outline-none"
        >
          <option value="created-at-desc">최신술</option>
          <option value="title-asc">제목순</option>
        </select>
        <div className="flex items-center border-b-2 grow ml-4 max-w-96">
          <input
            type="text"
            className="bg-transparent outline-none grow px-4 py-1"
          />
          <button>
            <HiSearch className="text-xl" />
          </button>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols2 xl:grid-cols-3 2xl:grid-cols-4">
        {list(0, 11).map(c => (
          <ContentItem key={c} className="mt-8" />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        {list(0, 1).map(c => (
          <button
            key={c}
            className={clsx(
              'px-2 py-2 mr-2 rounded last:mr-0',
              c === 0 && 'bg-neutral-800'
            )}
          >
            {c + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
