import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import Dashboard from "./routes/Dashboard/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


function App() {
 
  return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    
  );
}

export default App;
