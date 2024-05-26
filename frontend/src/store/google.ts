import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const googleLoginAtom = atom({
  key: 'googleLoginAtom',
  default: { login: false, usermail: '', token: '' },
  effects_UNSTABLE: [persistAtom],
});
