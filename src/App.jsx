import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import UserHome from "./pages/userPages/UserHome";
import AdminHome from "./pages/adminPages/AdminHome";
import AddTask from "./pages/userPages/AddTask";
import ViewTask from "./pages/userPages/ViewTask";
import Forbidden from "./components/errorHandling/Forbidden";
import NotFound from "./components/errorHandling/NotFound";
import Unauthorized from "./components/errorHandling/Unauthorized";

function App() {
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


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
          <Route index element={<UserHome />} />
          <Route path="add" element={<AddTask />} />
          <Route path="task" element={<ViewTask />} />
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
