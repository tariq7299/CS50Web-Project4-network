import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
// import Root from "./routes/Root/Root";
import * as React from "react"
import { CurrentViewProvider } from "./hooks/CurrentViewContext";
import Root from "./routes/Root/Root";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CurrentViewProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Root />} />
            </Route>
          </Routes>
        </CurrentViewProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
