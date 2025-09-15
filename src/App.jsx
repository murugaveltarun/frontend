import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/pages/UserDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddTask from "./pages/user/components/AddTask";
import AllTasks from "./pages/user/components/AllTasks";
import Forbidden from "./components/error/Forbidden";
import NotFound from "./components/error/NotFound";
import Unauthorized from "./components/error/Unauthorized";
import Logout from "./pages/auth/Logout";
import TaskPage from "./pages/user/pages/TaskPage";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import OauthCallBack from "./pages/auth/OauthCallBack";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/user-dashboard") || location.pathname.startsWith("/admin-dashboard") 
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/oauth2/callback/:token" element={<OauthCallBack />} />


        {/* error handling pages */}
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />

        {/* ADMIN and USER are validated from the jwt token after login. and it protects dasboards from cross access using protected route component */}
        {/* user's dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="add" element={<AddTask />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route index element={<AllTasks />} />
        </Route>

        {/* admin's dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
        </Route>
      </Routes>
        <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ className:isDashboard? "my-toast" : "my-toast-public", unstyled: true }} />

    </>
  );
}

export default App;
