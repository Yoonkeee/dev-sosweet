import { atom } from 'recoil';

export const productNameListState = atom<string[]>({
  key: 'productNameList',
  default: [],
});
