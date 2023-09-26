import prismadb from '@/lib/prismadb';
import { ColorForm } from './components/color-form';

const CategoryPage = async ({ params }: { params: { storeId: string; colorId: string } }) => {
  const colors = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colors} />
      </div>
    </div>
  );
};

export default CategoryPage;
