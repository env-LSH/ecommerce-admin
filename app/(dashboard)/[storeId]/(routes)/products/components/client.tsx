'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ProductColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data.table';
import { APIList } from '@/components/ui/api-list';

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex item-center justify-between">
        <Heading title={`Products  (${data.length})`} description="Mange products for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          추가
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Products" />
      <APIList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
