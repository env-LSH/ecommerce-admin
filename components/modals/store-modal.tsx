'use client';

import * as z from 'zod';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import axios from 'axios';
import { useRouter, redirect } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loadnig, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);

      toast.success('성공');
      // router.push(`/${response.data.id}`);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="상점 만들기"
      description="새로운 스토어를 추가하고 매니저 역활로 상품과 카테고리"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loadnig} placeholder="E-Commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loadnig} variant="outline" onClick={storeModal.onClose}>
                  취소
                </Button>
                <Button type="submit" disabled={loadnig}>
                  계속
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
