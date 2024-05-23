'use client';
import { siteConfig } from '@/config/site';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const RootLayout: NextPage<Props> = ({ children }) => {
  const pathname = usePathname();
  const currentNav = pathname?.split('/')[2];

  return (
    <div className="w-full bg-white lg:grid lg:grid-cols-7">
      <section className="sticky top-0 col-span-1 hidden h-screen w-full flex-col justify-start space-y-12 overflow-y-scroll bg-white py-[30px] shadow-lg lg:flex">
        <div className="">
          <Image
            src="/logo.png"
            alt="logo"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col justify-start">
          {siteConfig.dashboardItems.map((nav, i) => {
            return (
              <Link
                key={nav.label}
                href={nav.href}
                className={`${
                  currentNav == nav.href.split('/')[2]
                    ? 'text-white bg-primary font-semibold'
                    : 'text-black font-medium'
                } text-lg py-3 px-8 hover:bg-[#BA704F20] hover:shadow-custom-inset capitalize hover:text-black transition-all ease-in-out`}
              >
                {nav.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="col-span-6 h-full w-full bg-putih pb-7 lg:p-5">
        {children}
      </section>
    </div>
  );
};

export default RootLayout;
