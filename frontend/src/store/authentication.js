import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const adminAuthenticationAtom = atom({
  key: 'adminAuthenticationAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const authFailureAtom = atom({
  key: 'authFailureAtom',
  default: { status: false, enableOn: null },
  effects_UNSTABLE: [persistAtom],
});

export const wrongStackAtom = atom({
  key: 'wrongStackAtom',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const failureIntervalIdAtom = atom({
  key: 'failureIntervalIdAtom',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const demoPopupAtom = atom({
  key: 'demoPopupAtom',
  default: { status: false, enableOn: null },
  effects_UNSTABLE: [persistAtom],
});
