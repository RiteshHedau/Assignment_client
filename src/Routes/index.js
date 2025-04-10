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
import EditCourse from "../pages/Admin/Courses/EditCourse";
import DeleteCourse from "../pages/Admin/Courses/DeleteCourse";
import UploadCourse from "../pages/Admin/Courses/UploadCourse";
import UploadMultipleCourses from "../pages/Admin/Courses/UploadMultipleCourses";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Settings from "../pages/Settings";
import ManageUsers from "../pages/Admin/ManageUsers";

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
        element: <Courses />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),

        children: [
          { path: "users", element: <ManageUsers /> },
          { path: "courses-admin", element: <CoursesPanel /> },
          { path: "courses/edit", element: <EditCourse /> },
          { path: "courses/delete", element: <DeleteCourse /> },
          { path: "courses/upload", element: <UploadCourse /> },
          {
            path: "courses/upload-multiple",
            element: <UploadMultipleCourses />,
          },
        ],
      },
      {
        path: "profile",
        element: <EditUserForm />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
