import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Dashboard from "./routes/Dashboard/Dashboard";
import Following from "./routes/Following/Following";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Root from "./routes/Root/Root";

function App() {
 
  return (
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Root />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/following" element={<Following />} />
              </Route>
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  );
}

export default App;
