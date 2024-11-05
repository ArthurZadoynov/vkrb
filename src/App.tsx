import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom'
import { store } from './Redux/store';
import { router } from './route';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App
