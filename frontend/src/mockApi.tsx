import axios from 'axios';
import type { ProductWithSalesRecord } from 'src/types/dto';

const mockBaseUrl = '/mocks';
const mockInstance = axios.create({
  baseURL: mockBaseUrl,
});

export const getProductList = async () =>
  mockInstance.get<ProductWithSalesRecord[]>('/get/product-list').then(response => response.data);
