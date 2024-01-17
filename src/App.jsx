import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  SharedLayout,
  Products,
  Suppliers,
  Paynow,
  Report,
  SuppliersDetail,
  ProtectedRoutes,
  CreateProduct,
  CreateUser,
  Error,
} from "./pages";

// Actions
import { action as loginAction } from "./pages/Login";
import { action as createProductAction } from "./pages/CreateProduct";
import { action as createUserAction } from "./pages/CreateUser";
import { action as paynowAction } from "./pages/Paynow";
// Loaders
import { loader as productsLoader } from "./pages/Products";
import { loader as suppliersLoader } from "./pages/Suppliers";
import { loader as suppliersDetailLoader } from "./pages/SuppliersDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <Error />,
    children: [
      // Protected Routes
      {
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: "/createProduct",
            element: <CreateProduct />,
            action: createProductAction,
          },
          {
            path: "/createUser",
            element: <CreateUser />,
            action: createUserAction,
          },
          {
            path: "/report",
            element: <Report />,
          },
          {
            path: "/suppliers",
            element: <Suppliers />,
            loader: suppliersLoader,
          },
          {
            path: "/suppliers/:id",
            element: <SuppliersDetail />,
            loader: suppliersDetailLoader,
          },
          {
            path: "/suppliers/:id/paynow",
            element: <Paynow />,
            action: paynowAction,
          },
        ],
      },

      // Non-Protected Routes
      {
        path: "/Login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
