import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SneakerPage } from "./pages/SneakerPage";
import { NotFound } from "./pages/NotFound";
import { Loader } from "./components/Loader";
import { BasketPage } from "./pages/BasketPage";

// Создаем маршрутизацию с помощью функции createBrowserRouter и определяем маршруты приложения.
export const router = createBrowserRouter([
  {
    path: "Vkrb", // базовый путь
    element: <Layout />, // компонент Layout будет оборачивать дочерние маршруты
    loader: Loader, // компонент Loader, который будет загружаться перед рендерингом маршрутов
    children: [
      { index: true, element: <Home /> },

      { path: "sneaker/:id", element: <SneakerPage /> },

      { path: "basket", element: <BasketPage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
