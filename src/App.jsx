import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddTask from "./pages/user/AddTask";
import ViewTask from "./pages/user/AllTasks";
import Forbidden from "./components/error/Forbidden";
import NotFound from "./components/error/NotFound";
import Unauthorized from "./components/error/Unauthorized";
import Logout from "./pages/auth/Logout";

function App() {
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* error handling pages */ }
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
          <Route index element={<ViewTask />} />
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
    </>
  );
}

export default App;
