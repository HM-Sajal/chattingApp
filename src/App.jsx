import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import ResetPassword from "./pages/ResetPassword";
import Rootlayout from "./components/Rootlayout";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/authentication" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route element={<Rootlayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/msg" element={<Messages/>}/>
          <Route path="/notification" element={<Notifications/>}/>
        </Route>
      </Route>
    ))

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </>
  )
}

export default App
