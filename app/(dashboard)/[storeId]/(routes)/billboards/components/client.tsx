'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data.table';
import { APIList } from '@/components/ui/api-list';

interface BillBoardClientProps {
  data: BillboardColumn[];
}

const BillBoardClient = ({ data }: BillBoardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex item-center justify-between">
        <Heading
          title={`Bilborard  (${data.length})`}
          description="Mange billboards for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          추가
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Billboards" />
      <APIList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillBoardClient;
