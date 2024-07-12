import { type ProductWithSalesRecord } from '../types/dto';

export const productList: ProductWithSalesRecord[] = [
  {
    id: 1,
    productImage: null,
    category: '간식',
    isValidDate: true,
    name: '맛있는 닭다리',
    defaultPrice: 3000,
    vendor: '댕댕유통',
    totalRevenue: 30000,
    totalQuantitySold: 10,
    itemsReceivedCount: 1,
  },
  {
    id: 2,
    productImage: null,
    category: '간식',
    isValidDate: false,
    name: '오리목뼈',
    defaultPrice: 2000,
    vendor: '댕댕유통',
    totalRevenue: 20000,
    totalQuantitySold: 10,
    itemsReceivedCount: 0,
  },
];

export const product: ProductWithSalesRecord = {
  id: 1,
  productImage: null,
  category: '간식',
  isValidDate: true,
  name: '맛있는 닭다리',
  defaultPrice: 3000,
  vendor: '댕댕유통',
  totalRevenue: 30000,
  totalQuantitySold: 10,
  itemsReceivedCount: 1,
};
