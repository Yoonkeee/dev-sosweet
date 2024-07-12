import type { SaleInfo, Stock } from '../types/dto';

export const stockList: Stock[] = [
  {
    product: {
      id: 1,
      productImage: null,
      isValidDate: true,
      name: '맛있는 닭다리',
      defaultPrice: 3000,
    },
    id: 1,
    validDate: 250701,
    stockDate: 240701,
    productPrice: 3000,
    stockQuantity: 6,
  },
  {
    product: {
      id: 2,
      productImage: null,
      isValidDate: false,
      name: '오리목뼈',
      defaultPrice: 2000,
    },
    id: 2,
    validDate: 240801,
    stockDate: 240701,
    productPrice: 3000,
    stockQuantity: 2,
  },
];

export const stockItem: Stock = {
  product: {
    id: 1,
    productImage: null,
    isValidDate: true,
    name: '맛있는 닭다리',
    defaultPrice: 3000,
  },
  id: 1,
  validDate: 250701,
  stockDate: 240701,
  productPrice: 3000,
  stockQuantity: 6,
};

export const salesHistory: SaleInfo[] = [
  {
    stockItem: {
      stockId: 1,
      productId: 1,
      productImage: null,
      name: '맛있는 닭다리',
    },
    id: 1,
    saleDate: 240707,
    salePrice: 3000,
    saleQuantity: 2,
  },
  {
    stockItem: {
      stockId: 2,
      productId: 2,
      productImage: null,
      name: '오리목뼈',
    },
    id: 2,
    saleDate: 240710,
    salePrice: 2000,
    saleQuantity: 4,
  },
];
