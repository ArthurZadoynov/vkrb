import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SneakerPage } from "./pages/SneakerPage";
import { NotFound } from "./pages/NotFound";
import { Loader } from "./components/Loader";
import { BasketPage } from "./pages/BasketPage";

export const router = createBrowserRouter([
  {
    path: "Vkrb",
    element: <Layout />,
    loader: Loader,
    children: [
      { index: true, element: <Home /> },

      { path: "sneaker/:id", element: <SneakerPage /> },

      { path: "basket", element: <BasketPage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
