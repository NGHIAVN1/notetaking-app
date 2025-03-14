import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Root.jsx";
import LoginPage from "./components/pages/login.jsx";
import RegisterPage from "./components/pages/register.jsx";
import Root from "./components/pages/Root.jsx";
import HomePage from "./routes/HomePage.jsx";
import ProfileUser from "./routes/ProfileUser.jsx";
import ListForm from "./components/Notes/ListForm.jsx";
import SearchPage from "./routes/SearchPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trash" element={<h1>trash</h1>} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
