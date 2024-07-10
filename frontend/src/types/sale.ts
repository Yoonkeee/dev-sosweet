import type { ProductBase } from 'src/types/product';

export type Stock = {
  product: StockProductInfo;
  id: number;
  validDate?: number;
  stockDate: number;
  productPrice: number;
  stockQuantity: number;
};

export type StockProductInfo = ProductBase & {
  isValidDate: boolean;
  defaultPrice: number;
};

// 입고 등록 api request 타입
export type NewStockData = Omit<Stock, 'id' | 'product'> & { productId: StockProductInfo['id'] };

export type SaleInfo = {
  stockItem: SaleStockInfo;
  id: number;
  saleDate: number;
  salePrice: number;
  saleQuantity: number;
};

export type SaleStockInfo = {
  stockId: Stock['id'];
  productId: ProductBase['id'];
} & Omit<ProductBase, 'id'>;
