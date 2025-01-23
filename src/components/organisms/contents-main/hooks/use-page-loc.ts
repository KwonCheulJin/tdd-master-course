import { useState } from 'react';

const PAGE_INIT = 1;

export default function usePageLoc() {
  const [pageLoc, setPageLoc] = useState(PAGE_INIT);

  const onClickPage = (page: number) => {
    setPageLoc(page);
  };

  const onSubmit = () => {
    setPageLoc(PAGE_INIT);
  };
  return {
    pageLoc,
    onClickPage,
    onSubmit,
  };
}
