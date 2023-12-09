import { useQuery, UseQueryOptions } from 'react-query';

import { ResponseGetProductsInterface } from '@/interface/BaseApiResponse';
import ax from '@/service/axios';

export const getProducts = async (): Promise<ResponseGetProductsInterface> => {
  const response = await ax.get('/products');
  return response.data;
};

const useGetProducts = ({
  options,
}: {
  options?: UseQueryOptions<ResponseGetProductsInterface>;
}) => {
  return useQuery<ResponseGetProductsInterface>(
    ['useGetProducts/application'],
    () => getProducts(),
    options
  );
};

export default useGetProducts;
