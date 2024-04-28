import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Pages/Home/Home.jsx'
import Register from './Pages/Register/Register.jsx'
import Overview from './Pages/Overview/Overview.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import Login from './Pages/Login/Login.jsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/prueba",
    element: <div>Hello world!</div>,
  },
  {
    path: "/app",
    element: <App/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/registro",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/overview",
    element: <Overview/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>,
)
