'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ColorColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data.table';
import { APIList } from '@/components/ui/api-list';

interface ColorsClientProps {
  data: ColorColumn[];
}

const ColorsClient = ({ data }: ColorsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex item-center justify-between">
        <Heading title={`colors  (${data.length})`} description="Manage colors for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          추가
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Colors" />
      <APIList entityName="colors" entityIdName="ColorId" />
    </>
  );
};

export default ColorsClient;
