import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RightSideBar } from '../components/Builder/RightSideBar';
import { UIBuilder } from '../components/Builder/UIBuilder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RightSideBar />,
    children: [
      {
        path: '/',
        element: <UIBuilder />,
      },
      {
        path: '/editor/:collection_id',
        element: <UIBuilder />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
