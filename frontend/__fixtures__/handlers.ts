import { rest } from 'msw';
import type { ProductWithSalesRecord, ProductWithoutSalesRecord, SaleInfo, Stock } from 'src/types';

const baseUrl = '/mocks';

const productList: ProductWithSalesRecord[] = [
  {
    id: 1,
    productImage: '',
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
    productImage: '',
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

const product: ProductWithSalesRecord = {
  id: 1,
  productImage: '',
  category: '간식',
  isValidDate: true,
  name: '맛있는 닭다리',
  defaultPrice: 3000,
  vendor: '댕댕유통',
  totalRevenue: 30000,
  totalQuantitySold: 10,
  itemsReceivedCount: 1,
};

const stockList: Stock[] = [
  {
    product: {
      id: 1,
      productImage: '',
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
      productImage: '',
      isValidDate: false,
      name: '오리목뼈',
      defaultPrice: 2000,
    },
    id: 2,
    stockDate: 240701,
    productPrice: 3000,
    stockQuantity: 2,
  },
];

const stockItem: Stock = {
  product: {
    id: 1,
    productImage: '',
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

const salesHistory: SaleInfo[] = [
  {
    stockItem: {
      stockId: 1,
      productId: 1,
      productImage: '',
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
      productImage: '',
      name: '오리목뼈',
    },
    id: 2,
    saleDate: 240710,
    salePrice: 2000,
    saleQuantity: 4,
  },
];

export const handlers = [
  // 상품 리스트 조회
  rest.get(`${baseUrl}/get/product-list`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<ProductWithSalesRecord[]>(productList)),
  ),

  // 상품 추가
  rest.post(`${baseUrl}/post/add-new-product`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '상품 추가 성공!',
      }),
    ),
  ),

  // 개별 상품 조회
  rest.get(`${baseUrl}/get/product-list/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<ProductWithoutSalesRecord>(product)),
  ),

  // 상품 수정
  rest.post(`${baseUrl}/post/mod-product/:id`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '상품 수정 성공!',
      }),
    ),
  ),

  // 상품 삭제
  rest.get(`${baseUrl}/get/cancel-product/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: '상품 정보 삭제!' })),
  ),

  // 입고 상품 등록
  rest.post(`${baseUrl}/post/add-new-stock`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '입고 등록 성공!',
      }),
    ),
  ),

  // 입고 등록된 상품 갯수 증가
  rest.post(`${baseUrl}/post/update-receive-count/:id`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '상품 수정 성공!',
      }),
    ),
  ),

  // 입고 상품 리스트 조회
  rest.get(`${baseUrl}/get/stock-list`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Stock[]>(stockList)),
  ),

  // 입고 상품 조회
  rest.get(`${baseUrl}/get/stock-list/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Stock>(stockItem)),
  ),

  // 입고 정보 수정
  rest.post(`${baseUrl}/post/mod-stock/:id`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '입고 상품 수정 성공!',
      }),
    ),
  ),

  // 판매 등록
  rest.post(`${baseUrl}/post/register-sale`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '판매 등록 성공!',
      }),
    ),
  ),

  // 판매 내역 조회
  rest.get(`${baseUrl}/get/sales-history`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<SaleInfo[]>(salesHistory)),
  ),

  // 반품 등록
  rest.post(`${baseUrl}/post/cancel-sale/:id`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '반품 등록 성공!',
      }),
    ),
  ),

  // 상품 누적 판매 정보 수정
  rest.post(`${baseUrl}/post/mod-sale-info/:id`, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '누적 판매 정보(매출/수량) 수정! 성공!',
      }),
    ),
  ),
];
