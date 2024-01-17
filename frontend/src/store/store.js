import { atom, selector } from 'recoil';
import { Temporal } from 'temporal-polyfill';

export const currentDateState = atom({
  key: 'currentDate',
  default: Temporal.Now.plainDateISO('Asia/Seoul').toString(),
});

export const isNarrowAtom = atom({
  key: 'isNarrowAtom',
  default: false,
});

export const getToday = selector({
  key: 'getToday',
  get: () => Temporal.Now.plainDateISO('Asia/Seoul').toString(),
});

export const setTodayState = selector({
  key: 'setToday',
  get: () => null,
  set: ({ set }) => {
    set(currentDateState, Temporal.Now.plainDateISO('Asia/Seoul').toString());
  },
});

export const setNextDateState = selector({
  key: 'setNextDate',
  get: () => null,
  set: ({ get, set }) => {
    const currentDate = get(currentDateState);
    set(currentDateState, Temporal.PlainDate.from(currentDate).add({ days: 1 }).toString());
  },
});

export const setPrevDateState = selector({
  key: 'setPrevDate',
  get: () => null,
  set: ({ get, set }) => {
    const currentDate = get(currentDateState);
    set(currentDateState, Temporal.PlainDate.from(currentDate).subtract({ days: 1 }).toString());
  },
});

// import { configureStore, createSlice } from '@reduxjs/toolkit';
// import { Temporal } from 'temporal-polyfill
// ';
//
// let today = Temporal.Now.plainDateISO('Asia/Seoul').toString();
// export const makeTemporal = function (date) {
//   return Temporal.PlainDate.from(date);
// };
//
// const currentDate = createSlice({
//   name: 'date',
//   initialState: today,
//   reducers: {
//     setToday: () => {
//       today = Temporal.Now.plainDateISO('Asia/Seoul').toString();
//       return today;
//     },
//     getTemporal: state => Temporal.PlainDate.from(state),
//     tomorrow: state => {
//       const nextDate = Temporal.PlainDate.from(state).add({ days: 1 }).toString();
//       return nextDate;
//     },
//     yesterday: state => {
//       const prevDate = Temporal.PlainDate.from(state).subtract({ days: 1 }).toString();
//       return prevDate;
//     },
//   },
// });
//
// const selectedDog = createSlice({
//   name: 'name',
//   initialState: '',
//   reducers: {
//     setDog: (state, action) =>
//       // console.log('setDog ' + action.payload.name);
//       action.payload.name,
//   },
// });
//
// const statusBarHeight = createSlice({
//   name: 'statusBarHeight',
//   initialState: 0,
//   reducers: {
//     setStatusBarHeight: (state, action) => action.payload,
//   },
// });
//
// export default configureStore({
//   reducer: {
//     currentDate: currentDate.reducer,
//     selectedDog: selectedDog.reducer,
//     statusBarHeight: statusBarHeight.reducer,
//   },
// });
//
// export const { yesterday, getTemporal, tomorrow, setToday } = currentDate.actions;
// export const { setDog } = selectedDog.actions;
// export const { setStatusBarHeight } = statusBarHeight.actions;
