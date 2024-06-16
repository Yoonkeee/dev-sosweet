import { rest } from 'msw';

// msw 공식 docs
// https://v1.mswjs.io/

const baseUrl = '/mocks';

type InventoryListExampleType = {
  items: {
    id: number;
    name: string;
  }[];
};

const inventoryListExample: InventoryListExampleType = {
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ],
};

export const handlers = [
  rest.get(`${baseUrl}/inventory/example`, (req, res, ctx) =>
    res(
      ctx.json({
        message: 'example',
      }),
    ),
  ),

  rest.post(`${baseUrl}/inventory/example`, (req, res, ctx) =>
    res(
      ctx.json({
        message: 'post via msw is successful',
      }),
    ),
  ),

  rest.get(`${baseUrl}/inventory/list`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<InventoryListExampleType>(inventoryListExample)),
  ),
];
