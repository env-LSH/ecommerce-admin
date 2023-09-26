'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    console.log('root 페이지 실행 여부 확인해보장!');
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="p-4"></div>;
};

export default SetupPage;
