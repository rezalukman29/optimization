import { useQuery, UseQueryOptions } from 'react-query';

import { ProductInterface } from '@/interface/BaseApiResponse';
import ax from '@/service/axios';

export const getProductById = async ({
  id,
}: {
  id: number;
}): Promise<ProductInterface> => {
  const response = await ax.get(`/products/${id}`);
  return response.data;
};

const useGetProductById = ({
  id,
  options,
}: {
  id: number;
  options?: UseQueryOptions<ProductInterface>;
}) => {
  return useQuery<ProductInterface>(
    ['useGetProductById/application'],
    () => getProductById({ id }),
    options
  );
};

export default useGetProductById;
