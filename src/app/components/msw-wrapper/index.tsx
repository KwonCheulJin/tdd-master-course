'use client';
import { mockBrowser } from '@/src/app/components/msw-wrapper/mock-browser';
import { PropsWithChildren, useEffect, useState } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}
export default function MswWrapper({ children }: Props) {
  const [enableMSW, setEnableMSW] = useState(false);

  useEffect(() => {
    const init = async () => {
      await mockBrowser();
      setEnableMSW(true);
    };
    if (!enableMSW) {
      init();
    }
  }, [enableMSW]);

  return !enableMSW ? null : <div>{children}</div>;
}
