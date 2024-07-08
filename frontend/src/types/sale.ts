export type Stock = {
  productId: number;
  id: number;
  validDate?: number;
  stockDate: number;
  productPrice: number;
  stockQuantity: number;
};

export type SaleInfo = {
  stockItem: Stock;
  id: number;
  saleDate: number;
  salePrice: number;
  saleQuantity: number;
};
