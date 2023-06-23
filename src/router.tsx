import Home from './pages/Home';
import ContactDetails from './pages/ContactDetails';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: '/:id',
    element: <ContactDetails />,
  },
];
