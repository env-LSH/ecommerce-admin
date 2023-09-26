'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { SizeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data.table';
import { APIList } from '@/components/ui/api-list';

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient = ({ data }: SizesClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex item-center justify-between">
        <Heading title={`sizes  (${data.length})`} description="Manage sizes for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          추가
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Sizes" />
      <APIList entityName="sizes" entityIdName="SizeId" />
    </>
  );
};

export default SizesClient;
