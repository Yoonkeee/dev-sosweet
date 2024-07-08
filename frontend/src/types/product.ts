export type ProductInfo = Product & SalesRecord;

export type Product = {
  id: number;
  productImage?: string;
  category: '간식' | '잡화';
  isValidDate: boolean;
  name: string;
  defaultPrice: number;
  itemsReceivedCount: number;
  vendor?: string;
};

export type SalesRecord = {
  totalRevenue: number;
  totalQuantitySold: number;
};
