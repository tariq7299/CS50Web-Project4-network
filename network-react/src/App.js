import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Dashboard from "./routes/Dashboard/Dashboard";
import Following from "./routes/Following/Following";
import Profile from "./routes/Profile/Profile";
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
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/following" element={<Following />} />
                <Route path="/profile/:username" element={<Profile />} />
              </Route>
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  );
}

export default App;
