import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import App from "./../App";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Courses from "../pages/Courses";
import AdminPanel from "../pages/Admin/AdminPanel";
import UserList from "../pages/Admin/UserList";
import CoursesPanel from "../pages/Admin/CoursesPanel";
import EditUserForm from "../pages/Admin/EditUserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
        children:[
          {path: "users", element: <UserList /> },
          {path: "coursesAdmin", element: <CoursesPanel /> },
        ]
      },
      {
        path:"profile", element:<EditUserForm/>
      }
    ],
  },
]);

export default router;
