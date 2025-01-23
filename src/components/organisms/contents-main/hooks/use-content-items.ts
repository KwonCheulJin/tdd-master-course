import { PAGE_TAKE } from '@/components/organisms/contents-main/constant';
import { loadContentItems } from '@/components/organisms/contents-main/server-side';
import { ContentSortOption, ContentView } from '@/domains/content/type';
import { useEffect, useState } from 'react';

export default function useContentItems(
  pageLoc: number,
  sort: ContentSortOption
) {
  const [items, setItems] = useState<Array<ContentView>>([]);

  useEffect(() => {
    (async () => {
      const next = await loadContentItems({
        pageNum: pageLoc,
        pageTake: PAGE_TAKE,
        sort,
      });
      setItems(next);
    })();
  }, [pageLoc, sort]);

  const onSubmit = async ({
    pageLoc,
    sort,
    search,
  }: {
    pageLoc: number;
    sort: ContentSortOption;
    search: string;
  }) => {
    const next = await loadContentItems({
      pageNum: pageLoc,
      pageTake: PAGE_TAKE,
      sort,
      search,
    });
    setItems(next);
  };
  return { items, onSubmit };
}
