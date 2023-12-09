/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import * as React from 'react';
import FadeIn from 'react-fade-in';

import useGetProducts from '@/hooks/api/useGetProducts';

import Layout from '@/components/layout/Layout';
import Loading from '@/components/Loading';
import Seo from '@/components/Seo';
import { Text } from '@/components/Text';

import { ProductInterface } from '@/interface/BaseApiResponse';
import { currency } from '@/utils/function';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const router = useRouter();
  const { data, isFetching } = useGetProducts({
    options: {
      enabled: true,
    },
  });

  const Card = ({ item }: { item: ProductInterface }) => {
    return (
      <div
        onClick={() =>
          router.push({
            pathname: '/Detail',
            query: {
              id: item.id,
            },
          })
        }
        className='item-center flex cursor-pointer flex-row rounded-lg bg-white p-2 shadow-lg dark:bg-[#333] md:flex-col md:items-stretch md:rounded-xl md:p-4 '
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className='aspect-[3/3] w-[100px] rounded-md object-cover md:h-[200px] md:w-auto'
        />
        <Text label={item.title} fontWeight='bold' className='mt-2' />
        <Text label={item.description} fontWeight='thin' className='mt-2' />
        <Text
          label={currency(item.price)}
          fontWeight='semi-bold'
          className='mt-2'
        />
      </div>
    );
  };

  const productList = React.useMemo(
    () =>
      data?.products.map((item, index) => {
        return (
          <FadeIn
            key={item.id}
            delay={100 * index}
            className='mb-4 flex flex-col md:mb-6 '
          >
            <Card item={item} />
          </FadeIn>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      {isFetching && <Loading />}
      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center  py-12 text-center'>
            <section className='mt-8 overflow-y-auto px-4 sm:grid-cols-2 md:mt-12 md:grid md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
              {productList}
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
