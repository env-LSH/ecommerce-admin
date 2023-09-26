'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const MainNav = ({ className, ...props }: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathnmae = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      lable: 'Overview',
      active: pathnmae === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      lable: 'Billboards',
      active: pathnmae === `/${params.storeId}/Billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      lable: 'Categories',
      active: pathnmae === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      lable: 'Sizes',
      active: pathnmae === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      lable: 'Colors',
      active: pathnmae === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      lable: 'Products',
      active: pathnmae === `/${params.storeId}/products`,
    },

    {
      href: `/${params.storeId}/orders`,
      lable: 'Orders',
      active: pathnmae === `/${params.storeId}/orders`,
    },

    {
      href: `/${params.storeId}/settings`,
      lable: 'Settings',
      active: pathnmae === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground',
          )}>
          {route.lable}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
