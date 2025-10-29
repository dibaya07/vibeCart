import "./App.css";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SubmitPage from "./components/submitPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/cart", element: <Cart /> },
    { path: "/submit", element: <SubmitPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
