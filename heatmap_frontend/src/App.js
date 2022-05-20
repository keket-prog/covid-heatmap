import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import NavBar from "./components/navbar";
import LoginPage from "./components/login";
import HomePage from "./components/home";
import SignUp from "./components/sign-up";
import SubscribedHeatmap from "./components/SubscribedHeatmap";
import QueryStats from "./components/QueryStats";

import Footer from "./components/footer";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./uitls/PrivateRoute";
//React-router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route
            path="/heatmap"
            exact
            element={
              <PrivateRoute>
                <SubscribedHeatmap />
              </PrivateRoute>
            }
          />
          <Route
            path="/querystats"
            exact
            element={
              <PrivateRoute>
                <QueryStats />
              </PrivateRoute>
            }
          />
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
