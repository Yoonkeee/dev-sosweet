import type { MutateFunction } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';
import type { ProductWithoutSalesRecord, ProductWithSalesRecord } from 'src/types/dto';

const mockBaseUrl = '/mocks';
const mockInstance = axios.create({
  baseURL: mockBaseUrl,
});

export const getProductList = async () =>
  mockInstance.get<ProductWithSalesRecord[]>('/get/product-list').then(response => response.data);

export const addNewProduct = (newProduct: Omit<ProductWithoutSalesRecord, 'id' | 'itemsReceivedCount'>) =>
  mockInstance.post('/post/add-new-product', newProduct);

export const modProduct: MutateFunction<
  AxiosResponse<ProductWithoutSalesRecord>,
  Error,
  { newProduct: Omit<ProductWithoutSalesRecord, 'itemsReceivedCount'> }
> = ({ newProduct }) => mockInstance.post(`/post/mod-product/${newProduct.id}`, newProduct);

export const cancelProduct: MutateFunction<
  {
    message: string;
  },
  Error,
  { id: number }
> = ({ id }) => mockInstance.get(`/get/cancel-product/${id}`).then(response => response.data);
