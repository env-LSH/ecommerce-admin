import prismadb from '@/lib/prismadb';
import BillBoardClient from './components/client';
import { BillboardColumn } from './components/columns';
import { format } from 'date-fns';
const Billboard = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const fomattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={fomattedBillboards} />
      </div>
    </div>
  );
};

export default Billboard;
