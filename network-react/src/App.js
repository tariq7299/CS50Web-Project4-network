import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import Dashboard from "./routes/Dashboard/Dashboard";
import Following from "./routes/Following/Following";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


function App() {
 
  return (
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/following" element={<Following />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  );
}

export default App;
