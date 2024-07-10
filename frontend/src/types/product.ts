export type ProductBase = {
  id: number;
  name: string;
  productImage?: string;
};

export type ProductWithoutSalesRecord = ProductBase & {
  category: '간식' | '잡화';
  isValidDate: boolean;
  defaultPrice: number;
  itemsReceivedCount: number;
  vendor?: string;
};

export type ProductWithSalesRecord = ProductWithoutSalesRecord & SalesRecord;

export type SalesRecord = {
  totalRevenue: number;
  totalQuantitySold: number;
};

// 상품 추가 api request 타입
export type NewProductData = Omit<ProductWithoutSalesRecord, 'id' | 'itemsReceivedCount'>;

// 상품 수정 api request 타입
export type ModProductData = Omit<ProductWithoutSalesRecord, 'itemsReceivedCount'>;
