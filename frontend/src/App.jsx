import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './components/Cart';
import MyOrders from './components/MyOrders';
import Payment from './components/Payment';

const res = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/cart", element: <Cart /> },
  { path: "/my-orders", element: <MyOrders /> },
  { path: "/payment", element: <Payment /> }
]);

function App() {

  
  return (
    <Provider store={store}>
      <RouterProvider router={res} />
    </Provider>
  );
}

export default App;
