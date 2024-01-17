import axios from 'axios';
import Cookies from 'js-cookie';
import { Temporal } from '@js-temporal/polyfill';
import { getViewportSize, isMobileWeb } from '@toss/utils';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import _ from 'lodash';
import { isNarrowAtom } from './store/store';

const instance = axios.create({
  baseURL: '/api',
});
export const mainColor = '#1a2a52';

export const updateAllergy = (name, allergy) =>
  instance
    .post(
      '/post/update-allergy',
      { name, allergy },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.status === 200);

export const formatMinuteToTime = minutes => {
  let result = '';
  const hours = Math.floor(Math.abs(minutes / 60));
  let mins = Math.abs(minutes % 60);
  mins = mins < 10 && mins >= 0 ? `0${mins}` : mins;
  if (minutes < 0) result += '-';
  result += `${hours}:${mins}`;
  return result;
};

export const temporalToLocale = date =>
  // input : Temporal.PlainDate { year: 2023, month: 4, day: 25 }
  // output : 4월 25일 화요일
  date.toLocaleString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });

export const temporalToLocaleWithoutWeekday = date =>
  // input : Temporal.PlainDate { year: 2023, month: 4, day: 25 }
  // output : 4월 25일
  date.toLocaleString('ko-KR', { month: 'long', day: 'numeric' });

export const strToLocaleWithoutWeekday = date =>
  // input : 2023-04-25
  // output : 4월 25일
  dateStrToTemporal(date).toLocaleString('ko-KR', { month: 'long', day: 'numeric' });

export const temporalToStr = date =>
  // input : Temporal.PlainDate { year: 2023, month: 4, day: 25 }
  // output : 2023-04-25
  date.toString();

export const dateStrToTemporal = date =>
  // input : 2023-04-25
  // output : Temporal.PlainDate { year: 2023, month: 4, day: 25 }
  Temporal.PlainDate.from(date);

export const test = () => {
  instance
    .get('test', {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    })
    .then(response => console.log(response.data));
};

export const getUploadUrl = () => instance.get('/get/profile/upload-url').then(response => response.data);

export const uploadImage = (file, uploadURL) => {
  const form = new FormData();
  form.append('file', file);
  // console.log(form);
  return axios
    .post(uploadURL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data);
};

export const addProfile = (name, fileId) =>
  instance
    .post(
      '/post/add-profile',
      { name, fileId },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.status === 200);

export const getProfile = queryKey => {
  const [_, name, signal] = queryKey;
  if (name)
    return instance.get(`/get/profile/${name}`, { signal }).then(response => {
      if (response.status === 404) {
        return null;
      }
      return response.data;
    });
  return null;
};

// export const addProfile = (formData, name) => {
//     return instance.post(`/post/add-profile/${name}`, formData)
//         .then((response) => {
//             return true
//         })
//         .catch((error) => {
//             console.error('Error uploading file:', error);
//         });
// };

// get profile
// export const getProfile = ({queryKey}) => {
// export const getProfile = (name) => {
//     // const [_, name] = queryKey;
//     if (name === undefined || name === null || name === '' || typeof name === "object")
//         return
//     console.log('in getProfile : ' + name);
//     return instance.get(`/get/profile/${name.replace(' ', '')}.png`, {
//         responseType: 'blob',
//     }).then((response) => {
//         console.log(response);
//         return response.data;
//     })
//     // return instance.get(`/get/profile/${name.replace(' ', '')}.png`).then((response) => response.data);
// }

export const getDogInfo = ({ queryKey }) => {
  const [_, name] = queryKey;
  // console.log('in getDogInfo');
  if (name === undefined || name === null || name === '' || typeof name === 'object') return null;
  return instance.get(`/get/dog-info/${name}`).then(response => response.data);
};

export const addNewDog = data => {
  if (data.officialName === '' || data.officialName === null) {
    data.officialName = data.dogName;
  }
  // console.log(data);
  return instance
    .post(
      '/post/add-new-dog',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);
};

export const modDog = data => {
  if (data.officialName === '' || data.officialName === null) {
    data.officialName = data.dogName;
  }
  // console.log(data);
  return instance
    .post(
      '/post/mod-dog',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);
};

export const dogsList = () => instance.get('/get/dogs-list').then(response => response.data);

// get names only
export const uncheckedDogsList = () =>
  instance.get('/get/unchecked_used_list').then(response => response.data);

export const checkIn = data =>
  instance
    .post(
      '/post/check-in',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);

export const checkOut = data =>
  instance
    .post(
      '/post/check-out',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);

export const getCheckInHistory = id =>
  instance.get('/get/used-row-info/{id}').then(response => response.data);

// change check-in time
export const changeCheckIn = data =>
  // console.log(data.in_or_out);
  instance
    .post(
      '/post/change-check-in',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);

// reset data with data
export const modHistory = data =>
  instance
    .post(
      '/post/mod-history',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);

export const modPay = data =>
  instance
    .post(
      '/post/mod-pay',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);

// get pay-history from fast api server. url is /get/pay-history and passing dog name for parameter.
export const getPayHistory = () =>
  // console.log('in pay history');
  instance.get(`/get/pay-history`).then(response => response.data);

export const cancelCheckin = id => instance.get(`/get/cancel-checkin/${id}`).then(response => response.data);

export const cancelHistory = id => instance.get(`/get/cancel-history/${id}`).then(response => response.data);

export const cancelPay = id => instance.get(`/get/cancel-pay/${id}`).then(response => response.data);

// get timetable from fast api server. url is /get/timetable and passing date for parameter.
export const getTimeTable = ({ queryKey }) => {
  let [_, date] = queryKey;
  date = date.toString();
  // console.log('in api getTimeTable ' + date);
  return instance.get(`/get/timetable/${date}`).then(response => response.data);
};

export const getCheckoutTimetable = ({ queryKey }) => {
  let [_, date] = queryKey;
  date = date.toString();
  // console.log('in api getCheckoutTimetable ' + date);
  return instance.get(`/get/checkout-timetable/${date}`).then(response => response.data);
};

export const getRemainingMinutes = ({ queryKey }) => {
  const [_, name] = queryKey;
  if (name === undefined || name === null || name === '' || typeof name === 'object') return;
  return instance
    .get(`/get/dog-info/${name}`)
    .then(({ data }) => ({ name, remainingMinutes: data.remaining_minutes }));
};

export const getAllUnchecked = () =>
  instance.get(`/get/history-nonchecked`).then(({ data }) =>
    data.reduce((acc, item) => {
      acc[item.name] = {
        counts: item.counts,
        ids: item.ids.split(','),
        remainingMinutes: item.remaining_minutes,
      };
      return acc;
    }, {}),
  );

// get history from fast api server. url is /get/history and passing dog name for parameter.
// export const getHistory = (name) => {
export const getHistory = ({ queryKey }) => {
  // console.log(queryKey);
  let [_, name, getMessage] = queryKey;
  // console.log(`in history ${name}`);
  if (!name && getMessage) return getAllUnchecked();
  // if (name === undefined || name === null || name === '' || typeof name === 'object')
  //   if (getMessage) return getAllUnchecked();
  //   if (getMessage) return getAllUnchecked();
  //   else return null;
  if (getMessage === 'getMessage') name += '/message';
  return instance.get(`/get/history/${name}`).then(response => response.data);
};

export const getIdInfo = ({ queryKey }) => {
  const [_, id] = queryKey;
  // console.log('in api getIdInfo ' + id);
  return instance.get(`/get/id-info/${id}`).then(response => response.data);
};

export const getBelt = ({ queryKey }) => {
  const [_, id] = queryKey;
  // console.log('in api getBelt ' + id);
  return instance.get(`/get/id-belt/${id}`).then(response => response.data);
};

export const setBelt = ([id, belt]) =>
  // console.log('in api addBelt ' + id + ' ' + belt);
  instance.get(`/get/set-belt/${id}/${belt}`).then(response => response.data);

export const getUsedBelts = name => {
  // console.log('in api getUsedBelts ' + name);
  if (name === undefined || name === null || name === '' || typeof name === 'object') return null;
  return instance.get(`/get/get-used-belts/${name}`).then(response => response.data);
};

export const checkUsedBelts = name =>
  // console.log('in api checkUsedBelts ' + name);
  instance.get(`/get/check-used-belts/${name}`).then(response => response.data);

export const pay = data =>
  instance
    .post(
      '/post/pay',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => {
      if (data.belts !== undefined) {
        // console.log('in api pay ' + data.belts);
        checkUsedBelts(data.name);
      }
      return response.data;
    });

export const makeMessage = data => {
  // console.log('in api makeMessage ' + data);
  // console.log(data);

  if (data === undefined || data === null || !data.length) return null;
  return instance
    .post(
      '/post/make-message',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);
};

// # post. check_used_date with data incoming. data is array of row_id
// @src.post('/api/post/check-used-date')
// async def check_used_date(request: ArrayModel):
// data = json.loads(request.json())
// print(*data.values())
// response = db_interface.check_used_date(*data.values())
// return response

export const checkUsedDate = data =>
  // console.log('in api checkUsedDate ' + data);
  instance
    .post(
      '/post/check-used-date',
      { data },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      },
    )
    .then(response => response.data);

export const notOutTimetable = () => instance.get(`/get/not_out_timetable`).then(response => response.data);

export const testAPI = data => data;

export const getAllergy = ({ queryKey }) => {
  const [_, name] = queryKey;
  if (name !== '') return instance.get(`/get/allergy/${name}`).then(response => response.data);
  return null;
};

export const switchHistoryToPaid = rowId =>
  instance.get(`/get/switch-history-to-paid/${rowId}`).then(response => response);

export const getPayBeltsRequired = () =>
  instance.get(`/get/pay-belts-required`).then(response => response.data);

export const getPayTimeRequired = () =>
  instance.get(`/get/pay-time-required`).then(response => response.data);

export const isMobile = () => isMobileWeb();

export const getMobileSafeAreaMargin = () => (isMobileWeb() ? 'env(safe-area-inset-top)' : '0px');

export const getHeaderTopPosition = () => (isMobileWeb() ? `calc(10vh + env(safe-area-inset-top))` : '10vh');

export const useIsNarrow = () => {
  const [isNarrow, setIsNarrow] = useRecoilState(isNarrowAtom);
  const getSize = () => {
    const { height, width } = getViewportSize();
    setIsNarrow(width / height < 0.4);
  };
  window.addEventListener('resize', _.debounce(getSize, 100));

  useEffect(() => {
    getSize();
    return window.removeEventListener('resize', getSize);
  }, []);

  return isNarrow;
};
