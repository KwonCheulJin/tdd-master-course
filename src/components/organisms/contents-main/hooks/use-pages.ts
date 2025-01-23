import {
  PAGE_START,
  PAGE_TAKE,
} from '@/components/organisms/contents-main/constant';
import { loadCount } from '@/components/organisms/contents-main/server-side';
import { list } from 'radashi';
import { useEffect, useState } from 'react';

export default function usePages() {
  const [pages, setPages] = useState<number[]>([]);
  const calculatePage = async (search?: string) => {
    const count = await loadCount(search);
    const PAGE_MAX = Math.ceil(count / PAGE_TAKE);
    const PAGES_NEXT = PAGE_MAX === 0 ? [] : list(PAGE_START, PAGE_MAX);
    setPages(PAGES_NEXT);
  };
  useEffect(() => {
    calculatePage();
  }, []);

  const onSubmit = calculatePage;
  return {
    pages,
    onSubmit,
  };
}
