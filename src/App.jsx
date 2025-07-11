import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Basket } from "./pages/Basket";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { useGlobalContext } from "./hooks/useGlobalContext";
import { UserSetting } from "./pages/UserSetting";

function App() {
  const { user } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/basket",
          element: <Basket />,
        },
        { path: "/user/setting", element: <UserSetting /> },
      ],
    },
    { path: "/login", element: user ? <Navigate to={"/"} /> : <Login /> },
    { path: "/signUp", element: user ? <Navigate to={"/"} /> : <SignUp /> },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
