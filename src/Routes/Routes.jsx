import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Books from "../Pages/Books/Books";
import ErrorPage from "../ErrorPage/ErrorPage";
import BookDetails from "../Pages/BookDetails/BookDetails";
import ListedBooks from "../ListedBooks/ListedBooks";
import PagesToRead from "../PagesToRead/PagesToRead";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      // {
      //   path: "/books",
      //   element: <Books></Books>,
      // },
      {
        path: "/BookDetails/:bookId",
        Component: BookDetails,
      },

      {
        path: "/books",
        element: <ListedBooks />,
      },
      {
        path: "/pages-to-read",
        element: <PagesToRead />,
      },
    ],
    errorElement: <ErrorPage></ErrorPage>,
  },
]);
