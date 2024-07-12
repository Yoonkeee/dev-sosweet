/**
 * product
 */
export type Category = '간식' | '잡화';

export type ProductBase = {
  id: number;
  name: string;
  productImage: string | null;
};

export type ProductWithoutSalesRecord = ProductBase & {
  category: Category;
  isValidDate: boolean;
  defaultPrice: number;
  itemsReceivedCount: number;
  vendor: string | null;
};

export type ProductWithSalesRecord = ProductWithoutSalesRecord & SalesRecord;

export type SalesRecord = {
  totalRevenue: number;
  totalQuantitySold: number;
};

/**
 * stock
 */
export type Stock = {
  product: StockProductInfo;
  id: number;
  validDate: number | null;
  stockDate: number;
  productPrice: number;
  stockQuantity: number;
};

export type StockProductInfo = ProductBase & {
  isValidDate: boolean;
  defaultPrice: number;
};

/**
 * sale
 */
export type SaleInfo = {
  stockItem: SaleStockInfo;
  id: number;
  saleDate: number;
  salePrice: number;
  saleQuantity: number;
};

export type SaleStockInfo = Omit<ProductBase, 'id'> & {
  stockId: Stock['id'];
  productId: ProductBase['id'];
};
