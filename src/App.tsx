import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./Redux/store";
import { router } from "./route";
import "./App.css";

function App() {
  return (
    // Оборачиваем приложение в компонент Provider, чтобы сделать Redux-хранилище доступным для всех дочерних компонентов.
    // Оборачиваем приложение в компонент RouterProvider, чтобы настроить маршрутизацию с использованием ранее импортированного объекта router.
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
