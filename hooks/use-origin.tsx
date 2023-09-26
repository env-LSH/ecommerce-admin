'use client';

import { useEffect, useState } from 'react';

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  useEffect(() => {
    console.log('실행어디서돰?');
    setMounted(true);
  }, []);

  if (!mounted) {
    return '';
  }

  return origin;
};
