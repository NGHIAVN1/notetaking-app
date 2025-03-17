import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayoutAccountSidebar from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayoutAccountSidebar />}>
        </Route>

        <Route path="/login" element={<h1> Login Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
