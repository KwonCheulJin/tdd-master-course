'use client';
import ContentItem from '@/components/molecules/content-item';
import useContentItems from '@/components/organisms/contents-main/hooks/use-content-items';
import usePageLoc from '@/components/organisms/contents-main/hooks/use-page-loc';
import usePages from '@/components/organisms/contents-main/hooks/use-pages';
import { contentSortOption } from '@/domains/content/constants';
import useInputText from '@/hooks/use-input-text';
import useSelect from '@/hooks/use-select';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import { FormEventHandler } from 'react';
import { HiSearch } from 'react-icons/hi';

interface Props {
  className?: string;
}

export default function ContentsMain({ className }: Props) {
  const { select: sort, onChange: onChangeSort } = useSelect({
    options: contentSortOption,
    init: contentSortOption.createdAtDesc,
    base: contentSortOption.createdAtDesc,
  });
  const { text: search, onChange: onChangeSearch } = useInputText('');
  const { pages, onSubmit: onSubmitPages } = usePages();
  const { pageLoc, onClickPage, onSubmit: onSubmitPageLoc } = usePageLoc();
  const { items, onSubmit: onSubmitContentItems } = useContentItems(
    pageLoc,
    sort
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await onSubmitPages(search);
    await onSubmitContentItems({ pageLoc, sort, search });
    onSubmitPageLoc();
  };
  return (
    <div className={clsx('mb-12', layoutStyles.mx, className)}>
      <form className="flex items-center justify-center" onSubmit={onSubmit}>
        <select
          aria-label="sort"
          name="sort"
          id="sort"
          className="bg-neutral-800 px-2 py-1 rounded focus:outline-none"
          onChange={onChangeSort}
          value={sort}
        >
          <option value={contentSortOption.createdAtDesc}>최신순</option>
          <option value={contentSortOption.titleAsc}>제목순</option>
        </select>
        <div className="flex items-center border-b-2 grow ml-4 max-w-96">
          <input
            type="text"
            className="bg-transparent outline-none grow px-4 py-1"
            value={search}
            onChange={onChangeSearch}
            aria-label="search"
          />
          <button>
            <HiSearch className="text-xl" />
          </button>
        </div>
      </form>
      <div className="grid gap-6 grid-cols-1 md:grid-cols2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map(c => (
          <ContentItem key={c.id} className="mt-8" content={c} />
        ))}
      </div>
      <div
        className="flex justify-center items-center mt-8"
        data-testid="pagination"
      >
        {pages.map(c => (
          <button
            key={c}
            className={clsx(
              'px-2 py-2 mr-2 rounded last:mr-0 data-[selected=true]:bg-neutral-800'
            )}
            onClick={() => onClickPage(c)}
            data-selected={c === pageLoc}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
