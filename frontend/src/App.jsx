import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Layout from "./components/pages/Root.jsx";
import LoginPage from "./components/pages/login.jsx";
import RegisterPage from "./components/pages/register.jsx";
import Root from "./components/pages/Root.jsx";
import HomePage from "./routes/HomePage.jsx";
import ProfileUser from "./routes/ProfileUser.jsx";
import SearchPage from "./routes/SearchPage.jsx";
import { ProtectedRoute } from "./routes/ProtectRoute.jsx";
import { useEffect, useState } from "react";
import { isAuth } from "./util/auth.js";
import TrashPage from "./components/TrashPage.jsx";
import NotesCollection from "./components/NotesCollection.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:labelId" element={<NotesCollection />} />
          <Route path="/trash" element={<TrashPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
