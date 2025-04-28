import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import { PageOverview } from './PageOverview.jsx'
import { PageGuestList } from './PageGuestList.jsx'
import { PageTaskList } from './PageTaskList.jsx'
import { PageCalendar } from './PageCalendar.jsx'
import { PageBudget } from './PageBudget.jsx'


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PageOverview />,
      },
      {
        path: "/guest_list",
        element: <PageGuestList />,
      },
      {
        path: "/task_list",
        element: <PageTaskList />,
      },
      {
        path: "/calendar",
        element: <PageCalendar />,
      },
      {
        path: "/budget",
        element: <PageBudget />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
