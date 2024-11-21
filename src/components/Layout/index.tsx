import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom"; // Импортируем компонент Outlet из библиотеки react-router-dom для рендеринга вложенных маршрутов.

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
