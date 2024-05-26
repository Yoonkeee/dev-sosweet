import { createBrowserRouter } from 'react-router-dom';
import { Root } from './Root';
import {
  PayRequired,
  Home,
  History,
  PayHistory,
  DogsList,
  Hotelling,
  NotFound,
  Timetable,
  GetMessage,
} from './routes';
import { AlbumList } from './routes/AlbumList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'hotelling',
        element: <Hotelling />,
      },
      {
        path: 'timetable',
        element: <Timetable />,
      },
      {
        path: 'get-message',
        element: <GetMessage />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'pay-history',
        element: <PayHistory />,
      },
      {
        path: 'dogs-list',
        element: <DogsList />,
      },
      {
        path: 'pay-required',
        element: <PayRequired />,
      },
      {
        path: 'albums',
        element: <AlbumList />,
      },
    ],
  },
]);

export default router;
