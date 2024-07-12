import { rest } from 'msw';
import type { ProductWithoutSalesRecord, ProductWithSalesRecord, SaleInfo, Stock } from 'src/types/dto';
import { product, productList } from '../src/mocks/product';
import { salesHistory, stockItem, stockList } from '../src/mocks/sale';

const baseUrl = '/mocks';

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
