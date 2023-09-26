'use client';

import { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal = ({ isOpen, onClose, onConfirm, loading }: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="확인하세요"
      description="이 작업은 취소할 수 없습니다."
      isOpen={isOpen}
      onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          취소
        </Button>

        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          삭제
        </Button>
      </div>
    </Modal>
  );
};
